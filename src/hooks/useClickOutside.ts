import React, { useEffect } from "react";

export const useClickOutside = (
  containerRef: React.MutableRefObject<React.ReactNode>,
  handler: () => void
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (containerRef.current === event.target) {
        handler();
      }
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("click", listener);
    };
  }, [containerRef, handler]);
};
