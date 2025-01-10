import { useScopeContext } from "../contexts/scope.context";
import { DataRow } from "./DataRow";
import { EmptyDataRow } from "./EmptyDataRow";
import { LoadingRow } from "./LoadingRow";

export const Body = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const data = scopeStore.use.data();
  const displayData = scopeStore.use.displayData();
  const currentPage = scopeStore.use.currentPage();
  const loading = scopeStore.use.loading();

  if (loading)
    return (
      <tbody>
        <LoadingRow />
      </tbody>
    );

  if (data.length === 0)
    return (
      <tbody>
        <EmptyDataRow />
      </tbody>
    );

  return (
    <tbody>
      {displayData.map((r, idx) => (
        <DataRow key={idx * currentPage} record={r} rowIndex={idx} />
      ))}
    </tbody>
  );
};
