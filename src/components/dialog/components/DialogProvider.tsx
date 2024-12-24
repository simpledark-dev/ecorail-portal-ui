import React from "react";
import { ScopeContextProvider } from "../contexts/scope.context";
import { DialogContainer } from "./DialogContainer";

export interface DialogProviderProps {
  children: React.ReactNode;
}

export const DialogProvider = (props: DialogProviderProps) => {
  const { children } = props;

  return (
    <ScopeContextProvider>
      <DialogContainer />
      {children}
    </ScopeContextProvider>
  );
};
