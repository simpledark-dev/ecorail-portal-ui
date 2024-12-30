import { ScopeContextProvider } from "../contexts/scope.context";
import { TScopeStore } from "../types";
import { Head } from "./Head";

export interface RootProps {
  columns: TScopeStore["columns"];
  data: TScopeStore["data"];
}

export const Root = (props: RootProps) => {
  const { ...rest } = props;

  return (
    <ScopeContextProvider init={{ ...rest }}>
      <Entry />
    </ScopeContextProvider>
  );
};

const Entry = () => {
  return (
    <table>
      <Head />
    </table>
  );
};
