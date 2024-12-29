import React from "react";
import { useScopeContext } from "../contexts/scope.context";
import { ScopeEventName } from "../enums";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { MapConfig } from "../configs";

export const MapEvents = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const scopeEventBus = scopeContext.eventBus;
  const displayLocos = scopeStore.use.displayLocos();
  const locos = scopeStore.use.locos();
  const focusLocoId = scopeStore.use.focusLocoId();

  const map = useMap();

  const handleEventMapZoomIn = React.useCallback(() => {
    map.zoomIn(1);
  }, [map]);

  const handleEventMapZoomOut = React.useCallback(() => {
    map.zoomOut(1);
  }, [map]);

  const handleEventMapRecenter = React.useCallback(() => {
    if (displayLocos.length === 0) return;

    const coordinatesArray = displayLocos.map(
      (loco) => [loco.gps.lat, loco.gps.lng] as [number, number],
    );

    const bounds = L.latLngBounds(coordinatesArray);
    map.fitBounds(bounds, { padding: [MapConfig.RECENTER_PADDING, MapConfig.RECENTER_PADDING] });
    map.fire("zoom");
    map.fire("zoomlevelschange");
  }, [map, displayLocos]);

  const handleEventMapFocusLoco = React.useCallback(() => {
    const targetLoco = locos.find((v) => v.locoId === focusLocoId);
    if (targetLoco) {
      const bounds = L.latLngBounds([[targetLoco.gps.lat, targetLoco.gps.lng]]);
      map.fitBounds(bounds, {
        padding: [MapConfig.RECENTER_PADDING, MapConfig.RECENTER_PADDING],
      });
      map.fire("zoom");
      map.fire("zoomlevelschange");
    }
  }, [focusLocoId, locos]);

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

  React.useEffect(() => {
    scopeEventBus.on(ScopeEventName.MAP_FOCUS_LOCO, handleEventMapFocusLoco);
    return () => {
      scopeEventBus.off(ScopeEventName.MAP_FOCUS_LOCO, handleEventMapFocusLoco);
    };
  }, [handleEventMapFocusLoco]);

  return null;
};
