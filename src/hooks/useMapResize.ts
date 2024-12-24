import React from "react";
import { useMap } from "react-leaflet";

const useMapResize = () => {
  const map = useMap();

  React.useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
      map.flyTo(map.getCenter());
    }, 0);
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
};

export default useMapResize;
