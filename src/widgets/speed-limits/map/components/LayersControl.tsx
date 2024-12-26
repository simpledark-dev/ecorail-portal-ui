import { ToggleButton } from "@/components/toggle-button";
import React from "react";
import { useScopeContext } from "../contexts/scope.context";

export const LayersControl = React.memo(() => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const showMilepostsLayer = scopeStore.use.showMilepostsLayer();
  const showStationsLayer = scopeStore.use.showStationsLayer();
  const showTSOsLayer = scopeStore.use.showTSOsLayer();

  const layers = [
    {
      name: "Mileposts",
      checked: showMilepostsLayer,
      toggle: () => {
        scopeStore.setState({ showMilepostsLayer: !showMilepostsLayer });
      },
    },
    {
      name: "Stations",
      checked: showStationsLayer,
      toggle: () => {
        scopeStore.setState({ showStationsLayer: !showStationsLayer });
      },
    },
    {
      name: "Speed Limits",
      checked: showTSOsLayer,
      toggle: () => {
        scopeStore.setState({ showTSOsLayer: !showTSOsLayer });
      },
    },
  ];

  return (
    <div className="overflow-hidden rounded-[8px] border border-gray-400 bg-white drop-shadow-sm">
      <div className="px-3 py-2">
        <p className="text-sm font-semibold text-navy-700">Layers</p>
      </div>
      <div className="h-[1px] w-full bg-gray-400" />
      <div className="space-y-2 whitespace-nowrap p-3 text-xs">
        {layers.map((layer, index) => (
          <div key={index} className="flex items-center justify-between gap-12">
            <div className="flex items-center justify-start gap-2">
              <p className="font-semibold text-neutral-400">{layer.name}</p>
            </div>
            <ToggleButton
              size={"sm"}
              checked={layer.checked}
              onChange={layer.toggle}
              aria-label={`Toggle ${layer.name} layer`}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
LayersControl.displayName = "UI.LayersControl";
