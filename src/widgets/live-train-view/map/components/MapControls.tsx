import { Icons } from "@/components/icons";
import { useScopeContext } from "../contexts/scope.context";
import React from "react";
import { ScopeEventName } from "../enums";

export const MapControls = () => {
  const scopeContext = useScopeContext();
  const scopeEventBus = scopeContext.eventBus;
  const scopeStore = scopeContext.store;
  const showRailwayLayer = scopeStore.use.showRailwayLayer();

  const handleToggleLayer = React.useCallback(() => {
    scopeStore.setState({ showRailwayLayer: !showRailwayLayer });
  }, [showRailwayLayer]);

  const handleZoomIn = React.useCallback(() => {
    scopeEventBus.emit(ScopeEventName.MAP_ZOOM_IN);
  }, [scopeEventBus]);

  const handleZoomOut = React.useCallback(() => {
    scopeEventBus.emit(ScopeEventName.MAP_ZOOM_OUT);
  }, [scopeEventBus]);

  const handleRecenter = React.useCallback(() => {
    scopeEventBus.emit(ScopeEventName.MAP_RECENTER);
  }, [scopeEventBus]);

  return (
    <div className="space-y-2">
      <div className="rounded-[8px] border border-gray-400 bg-white drop-shadow-sm">
        <button
          type="button"
          aria-label="Toggle railway layer"
          className="group p-2"
          onClick={handleToggleLayer}
        >
          {React.createElement(showRailwayLayer ? Icons.Layers : Icons.LayersClear, {
            className:
              "fill-navy-700 h-4 w-4 transition-all duration-150 group-hover:scale-110 group-active:scale-90",
          })}
        </button>
      </div>

      <div className="rounded-[8px] border border-gray-400 bg-white drop-shadow-sm">
        <button type="button" aria-label="Zoom in" className="group p-2" onClick={handleZoomIn}>
          <Icons.Plus className="fill-navy-700 h-4 w-4 transition-all duration-150 group-hover:scale-110 group-active:scale-90" />
        </button>
        <div className="h-[1px] w-full bg-gray-400" />
        <button type="button" aria-label="Zoom out" className="group p-2" onClick={handleZoomOut}>
          <Icons.Minus className="fill-navy-700 h-4 w-4 transition-all duration-150 group-hover:scale-110 group-active:scale-90" />
        </button>
      </div>

      <div className="rounded-[8px] border border-gray-400 bg-white drop-shadow-sm">
        <button
          type="button"
          aria-label="Recenter map"
          className="group p-2"
          onClick={handleRecenter}
        >
          <Icons.Focus className="fill-navy-700 h-4 w-4 transition-all duration-150 group-hover:scale-110 group-active:scale-90" />
        </button>
      </div>
    </div>
  );
};
