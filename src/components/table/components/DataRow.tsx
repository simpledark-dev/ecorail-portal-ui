/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useScopeContext } from "../contexts/scope.context";
import { DataCell } from "./DataCell";

interface DataRowProps<T> {
  record: T;
}

export const DataRow = <T extends any>(props: DataRowProps<T>) => {
  const { record } = props;

  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const columns = scopeStore.use.columns();

  return (
    <tr
      css={css`
        td:first-of-type > div {
          padding-left: 20px;
        }
        td:last-of-type > div {
          padding-right: 20px;
        }
      `}
      className="group/row"
    >
      {columns.map((c) => (
        <DataCell key={String(c.key)} column={c} record={record} />
      ))}
    </tr>
  );
};
