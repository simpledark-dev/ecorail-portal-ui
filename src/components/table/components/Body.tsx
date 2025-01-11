/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
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

  const tdResetCss = css`
    td {
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
    }
  `;

  if (loading)
    return (
      <tbody css={tdResetCss}>
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
    <tbody css={tdResetCss}>
      {displayData.map((r, idx) => (
        <DataRow key={idx * currentPage} record={r} rowIndex={idx} />
      ))}
    </tbody>
  );
};
