import { createStore } from "zustand";
import { TScopeStore } from "../types";

export const createScopeStore = (
  init: Pick<
    TScopeStore,
    | "title"
    | "disable"
    | "snapOptions"
    | "maxRange"
    | "selectedStartDate"
    | "selectedEndDate"
    | "onChange"
  >,
) => {
  return createStore<TScopeStore>(() => ({
    ...init,
    selectedSnapOptionId: null,
    showSnapOptions: false,
    showCalendar: false,
  }));
};
