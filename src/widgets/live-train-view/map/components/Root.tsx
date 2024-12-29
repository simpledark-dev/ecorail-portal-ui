import { ScopeContextProvider } from "../contexts/scope.context";
import { TScopeStore } from "../types";
import { LiveStatus } from "./LiveStatus";
import { MapControls } from "./MapControls";
import { MapRoot } from "./MapRoot";
import { SignalsFilter } from "./SignalsFilter";

export interface RootProps {
  locos: TScopeStore["locos"];
  focusLocoId?: TScopeStore["focusLocoId"];
}

export const Root = (props: RootProps) => {
  const { locos, focusLocoId = null } = props;

  return (
    <ScopeContextProvider init={{ locos, focusLocoId }}>
      <Entry />
    </ScopeContextProvider>
  );
};

const Entry = () => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <MapRoot />

      <div className="absolute left-6 top-6 z-[2]">
        <SignalsFilter />
      </div>
      <div className="absolute bottom-6 left-6 z-[2]">
        <LiveStatus />
      </div>
      <div className="absolute bottom-6 right-6 z-[2]">
        <MapControls />
      </div>
    </div>
  );
};
