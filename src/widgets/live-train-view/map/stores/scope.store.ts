import { createStore } from "zustand";
import { TScopeStore } from "../types";

export const createScopeStore = (init: Pick<TScopeStore, "locos">) => {
  return createStore<TScopeStore>(() => ({
    ...init,
    displayLocos: init.locos,
    showInfoTooltipLocoMarkerInstanceId: null,
    showChildrenTooltipLocoClusterInstanceId: null,
    showLiveSignal: true,
    showRecentlySignal: true,
    showLostSignal: true,
  }));
};
