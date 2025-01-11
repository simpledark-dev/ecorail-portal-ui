import React from "react";
import { ScopeContextProvider } from "../contexts/scope.context";

export interface NoticeProviderProps {
  children: React.ReactNode;
}

export const NoticeProvider = (props: NoticeProviderProps) => {
  const { children } = props;

  return <ScopeContextProvider>{children}</ScopeContextProvider>;
};
