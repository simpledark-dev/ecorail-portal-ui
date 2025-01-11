import { createStore } from "zustand";
import { TScopeStore } from "../types";
import { nanoid } from "@/utils/common.util";

export const createScopeStore = () => {
  return createStore<TScopeStore>((set, _) => ({
    instances: [],
    create: (notice) => {
      const newInstance = { id: nanoid("alpha"), ...notice };
      set((state) => ({
        instances: [...state.instances, newInstance],
      }));
      return newInstance;
    },
    remove: (id) =>
      set((state) => ({
        instances: state.instances.filter((instance) => instance.id !== id),
      })),
  }));
};
