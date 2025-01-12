import { createStore } from "zustand";
import { TScopeStore } from "../types";
import { nanoid } from "@/utils/common.util";

export const createScopeStore = () => {
  return createStore<TScopeStore>((set, get) => ({
    instances: [],
    create: (notice) => {
      const newInstance = { id: nanoid("alpha"), ...notice };

      if (notice.key) {
        const existingInstance = get().instances.find((instance) => instance.key === notice.key);
        if (!existingInstance) {
          set((state) => ({
            instances: [...state.instances, newInstance],
          }));
          return newInstance;
        }
        return existingInstance;
      } else {
        set((state) => ({
          instances: [...state.instances, newInstance],
        }));

        return newInstance;
      }
    },
    remove: (id) =>
      set((state) => ({
        instances: state.instances.filter((instance) => instance.id !== id),
      })),
  }));
};
