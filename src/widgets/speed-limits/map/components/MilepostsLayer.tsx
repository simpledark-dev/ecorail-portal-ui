import React from "react";
import { useScopeContext } from "../contexts/scope.context";
import { filterMilepostsOutsideTSOs, getWholeMilepostsFromTrackCoordinates } from "../utils";
import { MilepostMarker } from "./MilepostMarker";
import { useMap } from "react-leaflet";
import { TScopeTrackCoordinateData } from "../types";

export const MilepostsLayer = React.memo(() => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const showTSOsLayer = scopeStore.use.showTSOsLayer();
  const trackCoordinates = scopeStore.use.trackCoordinates();
  const tsos = scopeStore.use.tsos();

  const [wholeMileposts, setWholeMileposts] = React.useState<TScopeTrackCoordinateData[]>([]);

  const map = useMap();

  const handleMapChange = React.useCallback(() => {
    let newMileposts = getWholeMilepostsFromTrackCoordinates(trackCoordinates, map.getZoom());

    if (showTSOsLayer) {
      newMileposts = filterMilepostsOutsideTSOs(newMileposts, tsos);
    }

    setWholeMileposts(newMileposts);
  }, [trackCoordinates, tsos, showTSOsLayer, map]);

  React.useEffect(() => {
    if (!map) return;

    handleMapChange();

    map.on("zoomend", handleMapChange);
    map.on("moveend", handleMapChange);

    return () => {
      map.off("zoomend", handleMapChange);
      map.off("moveend", handleMapChange);
    };
  }, [handleMapChange]);

  return (
    <>
      {wholeMileposts.map((milepost, idx) => (
        <MilepostMarker key={`${milepost.milepost}-${idx}`} milepost={milepost} />
      ))}
    </>
  );
});
MilepostsLayer.displayName = "UI.MilepostsLayer";
