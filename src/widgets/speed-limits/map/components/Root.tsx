import { ScopeContextProvider } from "../contexts/scope.context";
import { TScopeStore } from "../types";
import { LayersControl } from "./LayersControl";
import { LoadingOverlay } from "./LoadingOverlay";
import { MapControls } from "./MapControls";
import { MapRoot } from "./MapRoot";

export interface RootProps {
  trackCoordinates: TScopeStore["trackCoordinates"];
  stations: TScopeStore["stations"];
  tsos: TScopeStore["tsos"];
  loading?: TScopeStore["loading"];
}

export const Root = (props: RootProps) => {
  const { trackCoordinates, stations, tsos, loading = false } = props;

  return (
    <ScopeContextProvider init={{ trackCoordinates, stations, tsos, loading }}>
      <Entry />
    </ScopeContextProvider>
  );
};

const Entry = () => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <MapRoot />

      <LoadingOverlay />

      <div className="absolute left-6 top-6 z-[2]">
        <LayersControl />
      </div>
      <div className="absolute bottom-6 right-6 z-[2]">
        <MapControls />
      </div>
    </div>
  );
};
