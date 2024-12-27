import { useMapResize } from "@/hooks/useMapResize";
import { useScopeContext } from "../contexts/scope.context";
import { ScopeEventName } from "../enums";

export const MapResizer = () => {
  const scopeContext = useScopeContext();
  const scopeEventBus = scopeContext.eventBus;

  useMapResize(() => {
    scopeEventBus.emit(ScopeEventName.MAP_RECENTER);
  });

  return null;
};
