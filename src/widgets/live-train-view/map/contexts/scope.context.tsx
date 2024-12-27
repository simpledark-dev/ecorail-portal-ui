import React from "react";
import { StoreApi } from "zustand";
import { TScopeStore } from "../types";
import EventEmitter from "eventemitter3";
import { LocoSignalStatus, ScopeEventName } from "../enums";
import { createScopeStore } from "../stores/scope.store";
import { createSelectors } from "@/utils/common.util";
import { classifyLocoSignalStatus } from "../utils";

const ScopeContext = React.createContext<
  { store: StoreApi<TScopeStore>; eventBus: EventEmitter<ScopeEventName> } | undefined
>(undefined);

interface ScopeContextProviderProps {
  init: Pick<TScopeStore, "locos">;
  children: React.ReactNode;
}

export const ScopeContextProvider = React.memo((props: ScopeContextProviderProps) => {
  const { init, children } = props;

  const storeRef = React.useRef<StoreApi<TScopeStore>>(createScopeStore(init));
  const eventBusRef = React.useRef(new EventEmitter<ScopeEventName>());
  const storeSelectors = createSelectors(storeRef.current);
  const locos = storeSelectors.use.locos();
  const displayLocos = storeSelectors.use.displayLocos();
  const showLiveSignal = storeSelectors.use.showLiveSignal();
  const showRecentlySignal = storeSelectors.use.showRecentlySignal();
  const showLostSignal = storeSelectors.use.showLostSignal();

  React.useEffect(() => {
    storeSelectors.setState({
      ...init,
    });
  }, [init]);

  React.useEffect(() => {
    setTimeout(() => {
      eventBusRef.current.emit(ScopeEventName.MAP_RECENTER);
    }, 200);
  }, [displayLocos]);

  React.useEffect(() => {
    const filteredLocos = locos.filter((loco) => {
      const signalStatus = classifyLocoSignalStatus(loco.lastSeenUtc);

      if (signalStatus === LocoSignalStatus.LIVE_SIGNAL && showLiveSignal) {
        return true;
      }
      if (signalStatus === LocoSignalStatus.RECENTLY_SIGNAL && showRecentlySignal) {
        return true;
      }
      if (signalStatus === LocoSignalStatus.LOST_SIGNAL && showLostSignal) {
        return true;
      }

      return false;
    });

    storeSelectors.setState({ displayLocos: filteredLocos });
  }, [locos, showLiveSignal, showRecentlySignal, showLostSignal]);

  return (
    <ScopeContext.Provider value={{ store: storeRef.current, eventBus: eventBusRef.current }}>
      {children}
    </ScopeContext.Provider>
  );
});
ScopeContextProvider.displayName = "UIScopeContextProvider";

export const useScopeContext = () => {
  const context = React.useContext(ScopeContext);
  if (!context) {
    throw new Error("Missing ScopeContextProvider");
  }

  return { ...context, store: createSelectors(context.store) };
};
