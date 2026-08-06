import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (element) =>
      element.offsetParent !== null || element === document.activeElement,
  );
}

/**
 * Moves focus inside `containerRef` when `active` becomes true and traps the
 * Tab key so it cycles between the focusable elements inside the container.
 * Restores focus to the previously focused element on deactivation/cleanup.
 * If `initialFocusRef` is provided, it is focused on activation; otherwise the
 * first focusable element in the container is used.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  initialFocusRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = getFocusable(container);
    const initialTarget = initialFocusRef?.current ?? focusables[0];
    initialTarget?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const current = getFocusable(container);
      if (current.length === 0) {
        event.preventDefault();
        return;
      }

      const first = current[0];
      const last = current[current.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", onKeyDown);

    return () => {
      container.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [containerRef, active]);
}
