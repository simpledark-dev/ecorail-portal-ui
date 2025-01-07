import React from "react";
import { StoreApi } from "zustand";
import { TScopeStore } from "../types";
import { createScopeStore } from "../stores/scope.store";
import { createSelectors } from "@/utils/common.util";

const ScopeContext = React.createContext<{ store: StoreApi<TScopeStore<any>> } | undefined>(
  undefined,
);

interface ScopeContextProviderProps<T> {
  init: Pick<TScopeStore<T>, "columns" | "data" | "pagination" | "currentPage" | "onPageChange">;
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
    const data = storeSelectors.use.data();

    const handlePaginationData = () => {
      let dataSlice = [];
      if (pagination) {
        const start = (currentPage - 1) * selectedItemsPerPage;
        const end = start + selectedItemsPerPage;

        dataSlice = init.data.slice(start, end);
      } else {
        dataSlice = init.data;
      }

      storeSelectors.setState({
        displayData: dataSlice,
      });
    };

    React.useEffect(() => {
      storeSelectors.setState({
        ...init,
      });
    }, [init]);

    React.useEffect(() => {
      storeSelectors.setState({
        selectedItemsPerPage: init.pagination ? init.pagination.itemsPerPage : init.data.length,
      });
    }, [pagination]);

    React.useEffect(() => {
      storeSelectors.setState({
        totalPages: pagination ? Math.round(data.length / selectedItemsPerPage) : 1,
      });
    }, [selectedItemsPerPage]);

    React.useEffect(() => {
      handlePaginationData();
    }, [currentPage, init.data, pagination, selectedItemsPerPage]);

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
