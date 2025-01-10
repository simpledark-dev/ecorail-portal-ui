import React from "react";
import { StoreApi } from "zustand";
import { TScopeStore } from "../types";
import { createScopeStore } from "../stores/scope.store";
import { createSelectors, paginateData, sortData } from "@/utils/common.util";

const ScopeContext = React.createContext<{ store: StoreApi<TScopeStore<any>> } | undefined>(
  undefined,
);

interface ScopeContextProviderProps<T> {
  init: Pick<
    TScopeStore<T>,
    "columns" | "data" | "pagination" | "currentPage" | "loading" | "sortOption" | "onPageChange"
  >;
  children: React.ReactNode;
}

export const ScopeContextProvider = React.memo(
  <T extends object>(props: ScopeContextProviderProps<T>) => {
    const { init, children } = props;

    const storeRef = React.useRef<StoreApi<TScopeStore<T>>>(createScopeStore<T>(init));
    const storeSelectors = createSelectors(storeRef.current);
    const pagination = storeSelectors.use.pagination();
    const selectedItemsPerPage = storeSelectors.use.selectedItemsPerPage();
    const currentPage = storeSelectors.use.currentPage();
    const sortOption = storeSelectors.use.sortOption();
    const data = storeSelectors.use.data();

    const handleUpdateDisplayData = () => {
      let updatedData = init.data;

      if (sortOption) {
        updatedData = sortData(updatedData, sortOption.key, sortOption.direction);
      }

      if (pagination) {
        updatedData = paginateData(updatedData, currentPage, selectedItemsPerPage);
      }

      storeSelectors.setState({
        displayData: updatedData,
      });
    };

    React.useEffect(() => {
      storeSelectors.setState({
        ...init,
        columns: init.columns.filter((c) => c.show || c.show === undefined),
      });
    }, [init]);

    React.useEffect(() => {
      storeSelectors.setState({
        selectedItemsPerPage: init.pagination ? init.pagination.itemsPerPage : init.data.length,
      });
    }, [init.pagination?.itemsPerPage, init.data.length]);

    React.useEffect(() => {
      storeSelectors.setState({
        totalPages: pagination ? Math.round(data.length / selectedItemsPerPage) : 1,
      });
    }, [selectedItemsPerPage]);

    React.useEffect(() => {
      handleUpdateDisplayData();
    }, [currentPage, init.data, pagination, selectedItemsPerPage, sortOption]);

    return (
      <ScopeContext.Provider value={{ store: storeRef.current }}>{children}</ScopeContext.Provider>
    );
  },
);
ScopeContextProvider.displayName = "UI.ScopeContextProvider";

export const useScopeContext = () => {
  const context = React.useContext(ScopeContext);
  if (!context) {
    throw new Error("Missing ScopeContextProvider");
  }

  return { ...context, store: createSelectors(context.store) };
};
