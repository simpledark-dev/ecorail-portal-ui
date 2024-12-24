import React from "react";

export const useResizeObserver = <T extends HTMLElement>() => {
  const [rect, setRect] = React.useState<DOMRect | null>(null);
  const ref = React.useRef<T | null>(null);

  React.useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const updateRect = () => setRect(element.getBoundingClientRect());
    const resizeObserver = new ResizeObserver(() => {
      updateRect();
    });
    resizeObserver.observe(element);

    updateRect();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { ref, rect };
};
