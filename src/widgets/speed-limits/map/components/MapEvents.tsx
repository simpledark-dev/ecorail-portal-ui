import React from "react";
import { useScopeContext } from "../contexts/scope.context";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { MapConfig } from "../configs";
import { ScopeEventName } from "../enums";

export const MapEvents = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const scopeEventBus = scopeContext.eventBus;
  const stations = scopeStore.use.stations();

  const map = useMap();

  const handleEventMapZoomIn = React.useCallback(() => {
    map.zoomIn(1);
  }, [map]);

  const handleEventMapZoomOut = React.useCallback(() => {
    map.zoomOut(1);
  }, [map]);

  const handleEventMapRecenter = React.useCallback(() => {
    if (stations.length === 0) return;

    const coordinatesArray = stations.map(
      (station) => [station.gps.lat, station.gps.lng] as [number, number],
    );

    const bounds = L.latLngBounds(coordinatesArray);
    map.fitBounds(bounds, { padding: [MapConfig.RECENTER_PADDING, MapConfig.RECENTER_PADDING] });
    map.fire("zoom");
    map.fire("zoomlevelschange");
  }, [map, stations]);

  React.useEffect(() => {
    scopeEventBus.on(ScopeEventName.MAP_ZOOM_IN, handleEventMapZoomIn);
    return () => {
      scopeEventBus.off(ScopeEventName.MAP_ZOOM_IN, handleEventMapZoomIn);
    };
  }, [handleEventMapZoomIn]);

  React.useEffect(() => {
    scopeEventBus.on(ScopeEventName.MAP_ZOOM_OUT, handleEventMapZoomOut);
    return () => {
      scopeEventBus.off(ScopeEventName.MAP_ZOOM_OUT, handleEventMapZoomOut);
    };
  }, [handleEventMapZoomOut]);

  React.useEffect(() => {
    scopeEventBus.on(ScopeEventName.MAP_RECENTER, handleEventMapRecenter);
    return () => {
      scopeEventBus.off(ScopeEventName.MAP_RECENTER, handleEventMapRecenter);
    };
  }, [handleEventMapRecenter]);

  return null;
};
