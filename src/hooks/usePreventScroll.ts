import React from "react";

export const usePreventScroll = (shouldPrevent: boolean) => {
  React.useEffect(() => {
    const handleWindowWheel = (e: WheelEvent) => {
      if (shouldPrevent) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWindowWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWindowWheel);
    };
  }, [shouldPrevent]);
};
