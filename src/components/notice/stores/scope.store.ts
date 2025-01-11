import { createStore } from "zustand";
import { TScopeStore } from "../types";
import { nanoid } from "@/utils/common.util";

export const createScopeStore = () => {
  return createStore<TScopeStore>((set, get) => ({
    instances: [],
    create: (notice) => {
      if (notice.key) {
        const existingInstance = get().instances.find((instance) => instance.key === notice.key);
        if (!existingInstance) {
          const newInstance = { id: nanoid("alpha"), ...notice };
          set((state) => ({
            instances: [...state.instances, newInstance],
          }));
          return newInstance;
        }
        return existingInstance;
      }
      return { id: nanoid("alpha"), ...notice };
    },
    remove: (id) =>
      set((state) => ({
        instances: state.instances.filter((instance) => instance.id !== id),
      })),
  }));
};
