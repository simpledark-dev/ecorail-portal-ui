import React from "react";
import { useScopeContext } from "../contexts/scope.context";
import { StationMarker } from "./StationMarker";

export const StationsLayer = React.memo(() => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const stations = scopeStore.use.stations();

  return (
    <>
      {stations.map((station, idx) => {
        return <StationMarker key={station.abbr} idx={idx} station={station} />;
      })}
    </>
  );
});
StationsLayer.displayName = "UI.StationsLayer";
