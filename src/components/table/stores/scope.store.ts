import { createStore } from "zustand";
import { TScopeStore } from "../types";

export const createScopeStore = (init: Pick<TScopeStore, "columns" | "data">) => {
  return createStore<TScopeStore>(() => ({
    ...init,
  }));
};
