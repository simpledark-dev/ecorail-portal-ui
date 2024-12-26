import { ScopeContextProvider } from "../contexts/scope.context";
import { TScopeStore } from "../types";
import { LayersControl } from "./LayersControl";
import { MapControls } from "./MapControls";
import { MapRoot } from "./MapRoot";

export interface WidgetProps {
  trackCoordinates: TScopeStore["trackCoordinates"];
  stations: TScopeStore["stations"];
  tsos: TScopeStore["tsos"];
}

export const Widget = (props: WidgetProps) => {
  const { trackCoordinates, stations, tsos } = props;

  return (
    <ScopeContextProvider init={{ trackCoordinates, stations, tsos }}>
      <Entry />
    </ScopeContextProvider>
  );
};

const Entry = () => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <MapRoot />

      <div className="absolute left-6 top-6 z-[2]">
        <LayersControl />
      </div>
      <div className="absolute bottom-6 right-6 z-[2]">
        <MapControls />
      </div>
    </div>
  );
};
