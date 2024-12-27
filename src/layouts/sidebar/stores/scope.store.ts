import { createStore } from "zustand";
import { TScopeStore } from "../types";

export const createScopeStore = (
  init: Pick<TScopeStore, "company" | "navItems" | "show" | "collapse" | "onCollapseChange">,
) => {
  return createStore<TScopeStore>(() => ({
    ...init,
    selectedItem: null,
  }));
};
