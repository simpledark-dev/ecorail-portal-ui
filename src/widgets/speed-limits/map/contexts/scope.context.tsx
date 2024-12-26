import React from "react";
import { StoreApi } from "zustand";
import { TScopeStore } from "../types";
import EventEmitter from "eventemitter3";
import { createScopeStore } from "../stores/scope.store";
import { createSelectors } from "@/utils/common.util";
import { ScopeEventName } from "../enums";

const ScopeContext = React.createContext<
  { store: StoreApi<TScopeStore>; eventBus: EventEmitter<ScopeEventName> } | undefined
>(undefined);

interface ScopeContextProviderProps {
  init: Pick<TScopeStore, "trackCoordinates" | "stations" | "tsos">;
  children: React.ReactNode;
}

export const ScopeContextProvider = React.memo((props: ScopeContextProviderProps) => {
  const { init, children } = props;

  const storeRef = React.useRef<StoreApi<TScopeStore>>(createScopeStore(init));
  const eventBusRef = React.useRef(new EventEmitter<ScopeEventName>());
  const storeSelectors = createSelectors(storeRef.current);
  const stations = storeSelectors.use.stations();

  React.useEffect(() => {
    storeSelectors.setState({
      ...init,
    });
  }, [init]);

  React.useEffect(() => {
    setTimeout(() => {
      eventBusRef.current.emit(ScopeEventName.MAP_RECENTER);
    }, 200);
  }, [stations]);

  return (
    <ScopeContext.Provider value={{ store: storeRef.current, eventBus: eventBusRef.current }}>
      {children}
    </ScopeContext.Provider>
  );
});
ScopeContextProvider.displayName = "Widget.ScopeContextProvider";

export const useScopeContext = () => {
  const context = React.useContext(ScopeContext);
  if (!context) {
    throw new Error("Missing ScopeContextProvider");
  }

  return { ...context, store: createSelectors(context.store) };
};
