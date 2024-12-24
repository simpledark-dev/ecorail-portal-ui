import React from "react";
import { useMap } from "react-leaflet";

export const MapResizer = () => {
  const map = useMap();

  React.useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
      map.flyTo(map.getCenter());
    });
  }, [map]);

  React.useEffect(() => {
    const handleResize = () => {
      map.invalidateSize();
      map.flyTo(map.getCenter());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [map]);

  return null;
};
