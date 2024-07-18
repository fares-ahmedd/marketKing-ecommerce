import { useEffect, RefObject } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

function useClickOutside(
  refs: RefObject<HTMLElement>[],
  handler: Handler
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Check if the click is outside all provided refs
      const isOutside = refs.every((ref) => {
        const el = ref.current;
        return !el || !el.contains((event.target as Node) || null);
      });

      if (isOutside) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler]);
}

export default useClickOutside;
