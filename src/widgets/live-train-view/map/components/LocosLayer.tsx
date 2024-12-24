import React from "react";
import { useScopeContext } from "../contexts/scope.context";
import { LocoMarker } from "./LocoMarker";
import { TLocoData } from "../types";
import { useMap } from "react-leaflet";
import { calculateCenter, createClusters } from "@/utils/map.util";
import { ClusterConfig } from "../configs";
import { LocosCluster } from "./LocosCluster";

export const LocosLayer = React.memo(() => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const displayLocos = scopeStore.use.displayLocos();

  const [clusters, setClusters] = React.useState<TLocoData[][]>([]);

  const map = useMap();

  React.useEffect(() => {
    if (!map) return;

    const handleMapChange = () => {
      const newClusters = createClusters(displayLocos, map, ClusterConfig.LOCO_DISTANCE_THRESHOLD);
      setClusters(newClusters);
    };

    handleMapChange();

    map.on("zoomend", handleMapChange);
    map.on("moveend", handleMapChange);

    return () => {
      map.off("zoomend", handleMapChange);
      map.off("moveend", handleMapChange);
    };
  }, [displayLocos, map]);

  return (
    <>
      {clusters.map((cluster) => {
        if (cluster.length === 1) {
          const loco = cluster[0];
          return <LocoMarker key={loco.locoId} loco={loco} />;
        } else {
          const center = calculateCenter(cluster.map((outlet) => outlet.gps));
          return (
            <LocosCluster
              key={cluster.map((loco) => loco.locoId).join("")}
              locos={cluster}
              gps={center}
            />
          );
        }
      })}
    </>
  );
});
LocosLayer.displayName = "UI.LocosLayer";
