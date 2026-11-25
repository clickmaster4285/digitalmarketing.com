"use client";

import { useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";

/**
 * Live refresh for /erp-preview inside the ERP page editor's iframe.
 *
 * - On mount it tells the editor it is ready ("erp-preview:ready").
 * - On "erp-preview:refresh" from an allowed ERP origin it re-renders the
 *   draft in place (router.refresh() keeps the scroll position) and answers
 *   "erp-preview:refreshed" once the new draft is on screen.
 *
 * The ERP reloads the iframe itself when it gets no answer within 3 s, so
 * this is an optimization and must never throw.
 */
export function ErpPreviewRefresher({ allowedOrigins }: { allowedOrigins: string[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const waiting = useRef<{ source: MessageEventSource; origin: string }[]>([]);
  const refreshing = useRef(false);

  useEffect(() => {
    if (window.parent === window) return;
    for (const origin of allowedOrigins) {
      try {
        window.parent.postMessage({ type: "erp-preview:ready" }, origin);
      } catch {
        // Not delivered to that origin; nothing to do.
      }
    }
  }, [allowedOrigins]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!allowedOrigins.includes(event.origin) || !event.source) return;
      const data: unknown = event.data;
      if (
        typeof data !== "object" ||
        data === null ||
        (data as { type?: unknown }).type !== "erp-preview:refresh"
      ) {
        return;
      }
      waiting.current.push({ source: event.source, origin: event.origin });
      refreshing.current = true;
      try {
        startTransition(() => router.refresh());
      } catch {
        // The ERP falls back to reloading the iframe.
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [allowedOrigins, router]);

  useEffect(() => {
    if (isPending || !refreshing.current) return;
    refreshing.current = false;
    const replies = waiting.current.splice(0);
    // Answer after the refreshed draft has been painted.
    window.requestAnimationFrame(() => {
      for (const { source, origin } of replies) {
        try {
          (source as Window).postMessage({ type: "erp-preview:refreshed" }, origin);
        } catch {
          // The editor may have navigated away.
        }
      }
    });
  }, [isPending]);

  return null;
}
