import { useMapResize } from "@/hooks/useMapResize";
import { useScopeContext } from "../contexts/scope.context";
import { ScopeEventName } from "../enums";

export const MapResizer = () => {
  const scopeContext = useScopeContext();
  const scopeEventBus = scopeContext.eventBus;
  const scopeStore = scopeContext.store;
  const focusLocoId = scopeStore.use.focusLocoId();

  useMapResize(() => {
    if (!focusLocoId) {
      scopeEventBus.emit(ScopeEventName.MAP_RECENTER);
    } else {
      scopeEventBus.emit(ScopeEventName.MAP_FOCUS_LOCO);
    }
  });

  return null;
};
