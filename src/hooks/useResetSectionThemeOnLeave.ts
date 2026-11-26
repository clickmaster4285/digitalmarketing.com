import { useEffect } from "react";

const THEME_VARS = ["--background", "--foreground", "--border", "--muted-foreground"];

/**
 * Pages with scroll-based light/dark sections write their colors onto <html>.
 * Without a reset those values leak into the next page after client-side
 * navigation (e.g. white `text-foreground` on a `bg-white` location page,
 * which looks blank). This removes them when the page unmounts.
 */
export function useResetSectionThemeOnLeave() {
  useEffect(() => {
    return () => {
      const root = document.documentElement;
      root.removeAttribute("data-section-theme");
      THEME_VARS.forEach((name) => root.style.removeProperty(name));
    };
  }, []);
}
