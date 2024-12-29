import { createStore } from "zustand";
import { TScopeStore } from "../types";

export const createScopeStore = (init: Pick<TScopeStore, "locos" | "focusLocoId">) => {
  return createStore<TScopeStore>(() => ({
    ...init,
    displayLocos: init.locos,
    showRailwayLayer: false,
    showInfoTooltipLocoMarkerInstanceId: null,
    showChildrenTooltipLocoClusterInstanceId: null,
    showLiveSignal: true,
    showRecentlySignal: true,
    showLostSignal: true,
  }));
};
