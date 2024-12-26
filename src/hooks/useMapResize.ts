import React from "react";
import { useMap } from "react-leaflet";

export const useMapResize = () => {
  const map = useMap();

  const handleResize = React.useCallback(() => {
    map.invalidateSize();
    map.flyTo(map.getCenter());
  }, [map]);

  React.useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
};
