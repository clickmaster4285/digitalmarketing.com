"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { normalizeEditPath, type EditInstruction } from "@/lib/pageEdits";
import { applyPageEdits } from "@/lib/pageEditsDom";

/**
 * Applies ERP visual-editor edits to the current route after it renders.
 * Mounted once in the root layout, before the page content, so its layout
 * effect cleanup (which reverts the DOM changes) runs before React removes
 * or updates the previous route's nodes during the next navigation commit.
 *
 * Edits update live: while the tab is visible it re-checks the current
 * path every POLL_MS (and on focus) and swaps in changed edits without a
 * reload. Pair with POST /api/cms/revalidate from the ERP for instant updates.
 *
 * Renders nothing and fails silently: if the ERP is unreachable or a path
 * has no edits, the page is untouched.
 */

// Requests younger than this are reused (dedupes the many effects that fire
// on one navigation); anything older is refetched.
const FRESH_MS = 2_000;
const POLL_MS = 5_000;
const ANTI_FLICKER_MS = 1500;

type Cached<T> = { at: number; value: Promise<T>; settled?: T };
type PageEditsData = { instructions: EditInstruction[]; schema: Record<string, unknown>[] };
/** `undefined` = request failed (keep whatever is applied). */
type EditsResult = PageEditsData | null | undefined;

let pathsCache: Cached<Set<string>> | null = null;
const editsCache = new Map<string, Cached<EditsResult>>();

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function devWarn(message: string, error?: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[erp-page-edits] ${message}`, error ?? "");
  }
}

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.json();
}

function cached<T>(entry: Cached<T> | null | undefined, load: () => Promise<T>, fallback: T): Cached<T> {
  if (entry && Date.now() - entry.at < FRESH_MS) return entry;
  const next: Cached<T> = {
    at: Date.now(),
    // Keep the last known value as a synchronous hint while refetching.
    settled: entry?.settled,
    value: load().catch((error) => {
      devWarn("request failed", error);
      return fallback;
    }),
  };
  next.value.then((value) => {
    next.settled = value;
  });
  return next;
}

/**
 * Seeds the edited-paths hint from the <head> script's server-rendered list,
 * so the first client-side navigation to an edited page can hide <main>
 * synchronously. Marked stale (`at: 0`), so the list is still fetched fresh.
 */
function seedEditedPaths() {
  if (pathsCache || !Array.isArray(window.__erpEditedPaths)) return;
  const hint = new Set(window.__erpEditedPaths.filter((p): p is string => typeof p === "string"));
  pathsCache = { at: 0, settled: hint, value: Promise.resolve(hint) };
}

function editedPaths(): Cached<Set<string>> {
  seedEditedPaths();
  pathsCache = cached(
    pathsCache,
    async () => {
      const body = (await fetchJson("/api/cms/edited-pages")) as { paths?: unknown };
      const paths = Array.isArray(body.paths) ? body.paths : [];
      return new Set(paths.filter((p): p is string => typeof p === "string"));
    },
    pathsCache?.settled ?? new Set<string>(),
  );
  return pathsCache;
}

/** `{ edits }` body of /api/erp-edits?path= (and /api/cms/page-edits). */
function parseEditsBody(value: unknown): PageEditsData | null {
  const body = value as { edits?: { instructions?: unknown; schema?: unknown } | null } | null;
  const instructions = body?.edits?.instructions;
  if (!Array.isArray(instructions)) return null;
  const schema = Array.isArray(body?.edits?.schema)
    ? (body.edits.schema as unknown[]).filter(
        (entry): entry is Record<string, unknown> =>
          typeof entry === "object" && entry !== null && !Array.isArray(entry),
      )
    : [];
  return { instructions: instructions as EditInstruction[], schema };
}

/** Like parseEditsBody, but `undefined` when the proxy says the ERP failed. */
function editsResult(value: unknown): EditsResult {
  if ((value as { failed?: unknown } | null)?.failed === true) return undefined;
  return parseEditsBody(value);
}

function pageEdits(path: string): Promise<EditsResult> {
  const entry = cached<EditsResult>(
    editsCache.get(path),
    async () =>
      editsResult(await fetchJson(`/api/cms/page-edits?path=${encodeURIComponent(path)}`)),
    undefined,
  );
  editsCache.set(path, entry);
  return entry.value;
}

declare global {
  interface Window {
    /** Edited paths from the server, set by the <head> script. */
    __erpEditedPaths?: unknown[];
    /** Set by the blocking <head> script (ErpAntiFlickerScript) on edited pages. */
    __erpEditsPromise?: { path: string; promise: Promise<unknown> };
  }
}

/**
 * The edits request the <head> script started before hydration. Used once,
 * and only for the path it was made for; later navigations fetch fresh.
 * Resolves to `undefined` when the request failed (leave the page as is).
 */
function takeBootEdits(path: string): Promise<EditsResult> | null {
  const boot = window.__erpEditsPromise;
  if (!boot) return null;
  delete window.__erpEditsPromise;
  if (boot.path !== path) return null;
  return boot.promise
    .then((body) => (body === null ? undefined : editsResult(body)))
    .catch(() => undefined);
}

/**
 * Edits embedded in the route's own server HTML (ErpEditsData), read on the
 * first load only. JSON data: parsed, never executed.
 */
function readEmbeddedEdits(path: string): PageEditsData | null {
  const node = Array.from(
    document.querySelectorAll<HTMLScriptElement>('script#erp-edits-data[type="application/json"]'),
  ).find((script) => script.dataset.path === path);
  if (!node?.textContent) return null;
  try {
    return parseEditsBody(JSON.parse(node.textContent));
  } catch {
    return null;
  }
}

let firstLoad = true;

/** Removes the first-paint hiding style added by the <head> script. */
function removeAntiFlickerStyle() {
  document.getElementById("erp-anti-flicker")?.remove();
}

/**
 * The edited page's own JSON-LD (`seo.schema`), for this URL only. Added as
 * ld+json scripts (data, never executed; set via textContent, not HTML).
 * Returns a function that removes them again.
 */
function addSchema(schema: Record<string, unknown>[]): () => void {
  const scripts = schema.map((entry) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-erp-schema", "");
    script.textContent = JSON.stringify(entry);
    document.head.appendChild(script);
    return script;
  });
  return () => scripts.forEach((script) => script.remove());
}

/** Hides <main> until edits apply (max 1.5s). Returns an idempotent reveal. */
function hideMain(): () => void {
  const main = document.querySelector("main");
  if (!main || document.documentElement.dataset.antiFlicker === "off") return () => {};
  const value = main.style.getPropertyValue("opacity");
  const priority = main.style.getPropertyPriority("opacity");
  main.style.setProperty("opacity", "0", "important");
  let revealed = false;
  const reveal = () => {
    if (revealed) return;
    revealed = true;
    window.clearTimeout(timer);
    if (value) main.style.setProperty("opacity", value, priority);
    else main.style.removeProperty("opacity");
  };
  const timer = window.setTimeout(reveal, ANTI_FLICKER_MS);
  return reveal;
}

export function ErpPageEdits() {
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    const path = normalizeEditPath(pathname);
    if (!path) return;

    let active = true;
    let ready = false;
    let frame = 0;
    let revert: (() => void) | null = null;
    let reveal: (() => void) | null = null;
    let appliedKey = "";

    // Swaps the applied edits for `instructions` if they changed.
    const apply = (edits: EditsResult) => {
      if (!active || edits === undefined) return;
      const hasEdits = Boolean(edits && (edits.instructions.length || edits.schema.length));
      const key = hasEdits ? JSON.stringify(edits) : "";
      if (key === appliedKey) return;
      revert?.();
      revert = null;
      appliedKey = key;
      if (edits && hasEdits) {
        const revertDom = edits.instructions.length ? applyPageEdits(edits.instructions) : null;
        const removeSchema = addSchema(edits.schema);
        revert = () => {
          removeSchema();
          revertDom?.();
        };
      }
    };

    const isFirstLoad = firstLoad;
    firstLoad = false;
    const boot = takeBootEdits(path);
    const embedded = isFirstLoad ? readEmbeddedEdits(path) : null;
    if (embedded) {
      // Edits shipped in the page's own HTML: apply now, in the layout
      // effect, before the browser paints. The <head> script's uncached
      // request (if any) is the background check below.
      apply(embedded);
      removeAntiFlickerStyle();
    }
    const load = boot
      ? // First load of an edited page: <main> is already hidden by the
        // <head> script's CSS and the request is already in flight. The DOM
        // is hydrated here, so the edits apply as soon as it resolves
        // (apply() only swaps when the result differs).
        (async () => {
          apply(await boot);
        })()
      : embedded
        ? Promise.resolve()
      : (async () => {
          const paths = editedPaths();
          // Client-side navigation: only hide when we already know
          // (synchronously, before paint) that this route has edits.
          if (paths.settled?.has(path)) reveal = hideMain();
          if (!(await paths.value).has(path)) return;
          const edits = await pageEdits(path);
          if (!active || !edits || (!edits.instructions.length && !edits.schema.length)) return;
          // Wait for the new route's DOM to be committed before matching selectors.
          await new Promise<void>((resolve) => {
            frame = window.requestAnimationFrame(() => resolve());
          });
          if (!active) return;
          reveal?.();
          apply(edits);
        })();

    load
      .catch((error) => devWarn("failed to apply page edits", error))
      .finally(() => {
        removeAntiFlickerStyle();
        reveal?.();
        ready = true;
      });

    // Live updates. The page-edits route checks the edited-pages list itself,
    // so this also picks up pages that gain or lose edits.
    const refresh = () => {
      if (!active || !ready || document.visibilityState !== "visible") return;
      pageEdits(path)
        .then(apply)
        .catch((error) => devWarn("failed to refresh page edits", error));
    };
    const timer = window.setInterval(refresh, POLL_MS);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);

    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
      window.cancelAnimationFrame(frame);
      removeAntiFlickerStyle();
      reveal?.();
      revert?.();
      revert = null;
    };
  }, [pathname]);

  return null;
}
