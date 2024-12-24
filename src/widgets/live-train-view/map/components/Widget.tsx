import { ScopeContextProvider } from "../contexts/scope.context";
import { TScopeStore } from "../types";
import { MapControls } from "./MapControls";
import { MapRoot } from "./MapRoot";
import { SignalsFilter } from "./SignalsFilter";

export interface WidgetProps {
  locos: TScopeStore["locos"];
}

export const Widget = (props: WidgetProps) => {
  const { locos } = props;

  return (
    <ScopeContextProvider init={{ locos }}>
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
      <div className="absolute bottom-6 right-6 z-[2]">
        <MapControls />
      </div>
    </div>
  );
};
