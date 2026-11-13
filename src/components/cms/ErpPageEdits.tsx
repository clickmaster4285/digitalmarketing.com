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
/** `undefined` = request failed (keep whatever is applied). */
type EditsResult = EditInstruction[] | null | undefined;

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

function editedPaths(): Cached<Set<string>> {
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

function pageEdits(path: string): Promise<EditsResult> {
  const entry = cached<EditsResult>(
    editsCache.get(path),
    async () => {
      const body = (await fetchJson(
        `/api/cms/page-edits?path=${encodeURIComponent(path)}`,
      )) as { edits?: { instructions?: unknown } | null };
      const instructions = body.edits?.instructions;
      return Array.isArray(instructions) ? (instructions as EditInstruction[]) : null;
    },
    undefined,
  );
  editsCache.set(path, entry);
  return entry.value;
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
    const apply = (instructions: EditsResult) => {
      if (!active || instructions === undefined) return;
      const key = instructions?.length ? JSON.stringify(instructions) : "";
      if (key === appliedKey) return;
      revert?.();
      revert = null;
      appliedKey = key;
      if (instructions?.length) revert = applyPageEdits(instructions);
    };

    const paths = editedPaths();
    // Only hide when we already know (synchronously, before paint) that this
    // route has edits; hiding on a first-load guess would flash every page.
    if (paths.settled?.has(path)) reveal = hideMain();

    (async () => {
      if (!(await paths.value).has(path)) return;
      const instructions = await pageEdits(path);
      if (!active || !instructions?.length) return;
      // Wait for the new route's DOM to be committed before matching selectors.
      await new Promise<void>((resolve) => {
        frame = window.requestAnimationFrame(() => resolve());
      });
      if (!active) return;
      reveal?.();
      apply(instructions);
    })()
      .catch((error) => devWarn("failed to apply page edits", error))
      .finally(() => {
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
      reveal?.();
      revert?.();
      revert = null;
    };
  }, [pathname]);

  return null;
}
