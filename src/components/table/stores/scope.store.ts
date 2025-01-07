import { createStore } from "zustand";
import { TScopeStore } from "../types";

export const createScopeStore = <T>(
  init: Pick<TScopeStore<T>, "columns" | "data" | "pagination" | "currentPage" | "onPageChange">,
) => {
  return createStore<TScopeStore<T>>(() => ({
    ...init,
    displayData: [],
    totalPages: 0,
    currentPage: 0,
    showSnapOptions: false,
    selectedItemsPerPage: 0,
  }));
};
