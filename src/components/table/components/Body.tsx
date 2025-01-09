import { useScopeContext } from "../contexts/scope.context";
import { DataRow } from "./DataRow";

export const Body = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const displayData = scopeStore.use.displayData();
  const currentPage = scopeStore.use.currentPage();

  return (
    <tbody>
      {displayData.map((r, idx) => (
        <DataRow key={idx * currentPage} record={r} rowIndex={idx} />
      ))}
    </tbody>
  );
};
