import React from "react";
import { Polyline } from "react-leaflet";
import { useScopeContext } from "../contexts/scope.context";
import { TrackLineConfig } from "../configs";
import { reduceCoordinatesDensity } from "@/utils/map.util";

export const TrackLineLayer = React.memo(() => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const trackCoordinates = scopeStore.use.trackCoordinates();

  const reducedDensityCoordinates = React.useMemo(() => {
    return reduceCoordinatesDensity(trackCoordinates, TrackLineConfig.DENSITY_THRESHOLD);
  }, [trackCoordinates]);

  return (
    <Polyline
      positions={reducedDensityCoordinates.map((coord) => [coord.gps.lat, coord.gps.lng])}
      weight={4}
      color="#507CCF"
    />
  );
});
TrackLineLayer.displayName = "UI.TrackLineLayer";
