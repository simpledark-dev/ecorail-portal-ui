import { createStore } from "zustand";
import { TScopeStore } from "../types";
import { nanoid } from "@/utils/common.util";

export const createScopeStore = () => {
  return createStore<TScopeStore>((set, _) => ({
    instances: [],
    create: (dialog) =>
      set((state) => ({
        instances: [...state.instances, { id: nanoid("alpha"), ...dialog }],
      })),
    remove: (id) =>
      set((state) => ({
        instances: state.instances.filter((instance) => instance.id !== id),
      })),
  }));
};
