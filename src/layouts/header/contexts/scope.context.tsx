import React from "react";
import { StoreApi } from "zustand";
import { TScopeStore } from "../types";
import { createScopeStore } from "../stores/scope.store";
import { createSelectors } from "@/utils/common.util";

const ScopeContext = React.createContext<{ store: StoreApi<TScopeStore> } | undefined>(undefined);

interface ScopeContextProviderProps {
  init: TScopeStore;
  children: React.ReactNode;
}

export const ScopeContextProvider = React.memo((props: ScopeContextProviderProps) => {
  const { init, children } = props;

  const storeRef = React.useRef<StoreApi<TScopeStore>>(createScopeStore(init));
  const storeSelectors = createSelectors(storeRef.current);

  React.useEffect(() => {
    storeSelectors.setState({
      ...init,
    });
  }, [init]);

  return (
    <ScopeContext.Provider value={{ store: storeRef.current }}>{children}</ScopeContext.Provider>
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
