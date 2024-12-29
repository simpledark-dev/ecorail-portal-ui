import { StoreApi } from "zustand";
import { TScopeStore } from "../types";
import React from "react";
import { createScopeStore } from "../stores/scope.store";
import { createSelectors } from "@/utils/common.util";
import moment from "moment";

const ScopeContext = React.createContext<{ store: StoreApi<TScopeStore> } | undefined>(undefined);

interface ScopeContextProviderProps {
  init: Pick<
    TScopeStore,
    "title" | "disable" | "snapOptions" | "maxRange" | "selectedStartDate" | "selectedEndDate"
  >;
  children: React.ReactNode;
}

export const ScopeContextProvider = React.memo((props: ScopeContextProviderProps) => {
  const { init, children } = props;

  const storeRef = React.useRef<StoreApi<TScopeStore>>(createScopeStore(init));
  const storeSelectors = createSelectors(storeRef.current);
  const snapOptions = storeSelectors.use.snapOptions();
  const selectedStartDate = storeSelectors.use.selectedStartDate();
  const selectedEndDate = storeSelectors.use.selectedEndDate();

  React.useEffect(() => {
    const startMoment = moment(selectedStartDate);
    const endMoment = moment(selectedEndDate);
    const durationInDays = endMoment.diff(startMoment, "days");

    const matchedOption = snapOptions?.find(
      (option) => option.rangeDaysFromNow !== null && durationInDays === option.rangeDaysFromNow,
    );

    storeRef.current.setState({ selectedSnapOptionId: matchedOption ? matchedOption.id : null });
  }, [selectedStartDate, selectedEndDate]);

  return (
    <ScopeContext.Provider value={{ store: storeRef.current }}>{children}</ScopeContext.Provider>
  );
});
ScopeContextProvider.displayName = "UI.ScopeContextProvider";

export const useScopeContext = () => {
  const context = React.useContext(ScopeContext);
  if (!context) {
    throw new Error("Missing ScopeContextProvider");
  }

  return { ...context, store: createSelectors(context.store) };
};
