import React from "react";
import { StoreApi } from "zustand";
import { TScopeStore } from "../types";
import { createSelectors, wildCardSearch } from "@/utils/common.util";
import { createScopeStore } from "../stores/scope.store";

const ScopeContext = React.createContext<{ store: StoreApi<TScopeStore> } | undefined>(undefined);

interface ScopeContextProviderProps {
  init: Pick<TScopeStore, "title" | "icon" | "options" | "selectedValue" | "onSelectedValueChange">;
  children: React.ReactNode;
}

export const ScopeContextProvider = React.memo((props: ScopeContextProviderProps) => {
  const { init, children } = props;

  const storeRef = React.useRef<StoreApi<TScopeStore>>(createScopeStore(init));
  const storeSelectors = createSelectors(storeRef.current);
  const options = storeSelectors.use.options();
  const searchInput = storeSelectors.use.searchInput();

  React.useEffect(() => {
    storeSelectors.setState({ displayOptions: wildCardSearch(options, searchInput) });
  }, [searchInput]);

  React.useEffect(() => {
    storeSelectors.setState({
      ...init,
      displayOptions: init.options,
    });
  }, [init]);

  return (
    <ScopeContext.Provider value={{ store: storeRef.current }}>{children}</ScopeContext.Provider>
  );
});
ScopeContextProvider.displayName = "UI.ScopeContextProvider";

export const useScopeContext = () => {
  const context = React.useContext(ScopeContext);
  if (!context) {
    throw new Error("Missing ScopeContextProvider");
  }

  return { ...context, store: createSelectors(context.store) };
};
