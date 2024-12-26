import { createStore } from "zustand";
import { TScopeStore } from "../types";

export const createScopeStore = (init: TScopeStore) => {
  return createStore<TScopeStore>(() => ({
    ...init,
  }));
};
