import { createStore } from "zustand";
import { TScopeStore } from "../types";

export const createScopeStore = (
  init: Pick<
    TScopeStore,
    "title" | "icon" | "disable" | "options" | "selectedValues" | "onSelectedValuesChange"
  >,
) => {
  return createStore<TScopeStore>(() => ({
    ...init,
    showMenu: false,
    searchInput: "",
    displayOptions: [],
    tempSelectedValues: init.selectedValues,
  }));
};
