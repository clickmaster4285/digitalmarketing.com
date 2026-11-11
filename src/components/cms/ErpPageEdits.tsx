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
 * Renders nothing and fails silently: if the ERP is unreachable or a path
 * has no edits, the page is untouched.
 */

const CACHE_TTL_MS = 60_000;
const ANTI_FLICKER_MS = 1500;

type Cached<T> = { at: number; value: Promise<T>; settled?: T };

let pathsCache: Cached<Set<string>> | null = null;
const editsCache = new Map<string, Cached<EditInstruction[] | null>>();

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function devWarn(message: string, error?: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[erp-page-edits] ${message}`, error ?? "");
  }
}

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.json();
}

function cached<T>(entry: Cached<T> | null | undefined, load: () => Promise<T>, fallback: T): Cached<T> {
  if (entry && Date.now() - entry.at < CACHE_TTL_MS) return entry;
  const next: Cached<T> = {
    at: Date.now(),
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
    new Set<string>(),
  );
  return pathsCache;
}

function pageEdits(path: string): Promise<EditInstruction[] | null> {
  const entry = cached(
    editsCache.get(path),
    async () => {
      const body = (await fetchJson(
        `/api/cms/page-edits?path=${encodeURIComponent(path)}`,
      )) as { edits?: { instructions?: unknown } | null };
      const instructions = body.edits?.instructions;
      return Array.isArray(instructions) ? (instructions as EditInstruction[]) : null;
    },
    null,
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
    let frame = 0;
    let revert: (() => void) | null = null;
    let reveal: (() => void) | null = null;

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
      revert = applyPageEdits(instructions);
    })()
      .catch((error) => devWarn("failed to apply page edits", error))
      .finally(() => reveal?.());

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
      reveal?.();
      revert?.();
      revert = null;
    };
  }, [pathname]);

  return null;
}
