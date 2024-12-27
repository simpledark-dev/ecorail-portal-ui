import React from "react";
import { StoreApi } from "zustand";
import { TScopeStore } from "../types";
import { createSelectors } from "@/utils/common.util";
import { createScopeStore } from "../stores/scope.store";
import { useLocation } from "react-router-dom";

const ScopeContext = React.createContext<{ store: StoreApi<TScopeStore> } | undefined>(undefined);

interface ScopeContextProviderProps {
  init: Pick<TScopeStore, "company" | "navItems" | "show" | "collapse" | "onCollapseChange">;
  children: React.ReactNode;
}

export const ScopeContextProvider = React.memo((props: ScopeContextProviderProps) => {
  const { init, children } = props;

  const storeRef = React.useRef<StoreApi<TScopeStore>>(createScopeStore(init));
  const storeSelectors = createSelectors(storeRef.current);
  const navItems = storeSelectors.use.navItems();

  const location = useLocation();

  React.useEffect(() => {
    storeSelectors.setState({
      ...init,
    });
  }, [init]);

  React.useEffect(() => {
    const currentSelectedItem = navItems.find((item) => location.pathname === item.href);
    storeSelectors.setState({ selectedItem: currentSelectedItem });
  }, [location, navItems]);

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
