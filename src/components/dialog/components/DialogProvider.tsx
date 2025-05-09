import React from "react";
import { ScopeContextProvider } from "../contexts/scope.context";

export interface DialogProviderProps {
  children: React.ReactNode;
}

export const DialogProvider = (props: DialogProviderProps) => {
  const { children } = props;

  return <ScopeContextProvider>{children}</ScopeContextProvider>;
};
