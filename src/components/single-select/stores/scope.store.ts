import { createStore } from "zustand";
import { TScopeStore } from "../types";

export const createScopeStore = (
  init: Pick<
    TScopeStore,
    "title" | "icon" | "options" | "selectedOption" | "onSelectedOptionChange"
  >,
) => {
  return createStore<TScopeStore>(() => ({
    ...init,
    showMenu: false,
    searchInput: "",
    displayOptions: [],
  }));
};
