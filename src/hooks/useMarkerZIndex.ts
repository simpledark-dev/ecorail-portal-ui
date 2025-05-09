import React from "react";
import L from "leaflet";

export const useMarkerZIndex = (
  props: {
    map: L.Map;
    markerRef: React.RefObject<any>;
    zIndex: number;
    force?: boolean;
  },
  deps: React.DependencyList,
) => {
  const { map, markerRef, zIndex, force = true } = props;

  const handleSetMarkerZIndex = () => {
    if (markerRef.current) {
      const markerWrapper = markerRef.current.parentElement;
      if (markerWrapper) {
        markerWrapper.style.zIndex = `${zIndex}`;
      }
    }
  };

  React.useEffect(() => {
    if (!map) return;

    handleSetMarkerZIndex();

    if (force) {
      // Force
      setTimeout(() => {
        handleSetMarkerZIndex();
      }, 200);

      // Force
      setTimeout(() => {
        handleSetMarkerZIndex();
      }, 400);
    }

    map.on("zoomanim", handleSetMarkerZIndex);
    map.on("zoomstart", handleSetMarkerZIndex);
    map.on("zoomend", handleSetMarkerZIndex);
    map.on("zoomlevelschange", handleSetMarkerZIndex);

    return () => {
      map.off("zoomanim", handleSetMarkerZIndex);
      map.off("zoomstart", handleSetMarkerZIndex);
      map.off("zoomend", handleSetMarkerZIndex);
      map.off("zoomlevelschange", handleSetMarkerZIndex);
    };
  }, [markerRef, zIndex, map, ...deps]);
};
