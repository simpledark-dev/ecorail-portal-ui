import { createStore } from "zustand";
import { TScopeStore } from "../types";

export const createScopeStore = (
  init: Pick<TScopeStore, "trackCoordinates" | "stations" | "tsos" | "loading">,
) => {
  return createStore<TScopeStore>(() => ({
    ...init,
    showInfoTooltipTSOLineInstanceId: null,
    showMilepostsLayer: true,
    showTSOsLayer: true,
    showStationsLayer: true,
  }));
};
