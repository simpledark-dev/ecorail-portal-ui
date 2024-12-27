import { createStore } from "zustand";
import { TScopeStore } from "../types";

export const createScopeStore = (
  init: Pick<TScopeStore, "title" | "icon" | "options" | "selectedValue" | "onSelectedValueChange">,
) => {
  return createStore<TScopeStore>(() => ({
    ...init,
    showMenu: false,
    searchInput: "",
    displayOptions: [],
  }));
};
