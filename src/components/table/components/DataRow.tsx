/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useScopeContext } from "../contexts/scope.context";
import { DataCell } from "./DataCell";
import { DataCellFullRow } from "./DataCellFullRow";

interface DataRowProps<T> {
  record: T;
  rowIndex: number;
}

export const DataRow = <T extends any>(props: DataRowProps<T>) => {
  const { record, rowIndex } = props;

  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const columns = scopeStore.use.columns();

  const fullRowColumns = columns.filter((c) => c.fullRow);
  const regularColumns = columns.filter((c) => !c.fullRow);

  return (
    <>
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
        {regularColumns.map((c) => (
          <DataCell key={String(c.key)} column={c} record={record} rowIndex={rowIndex} />
        ))}
      </tr>

      {fullRowColumns.map((c) => {
        return (
          <tr key={String(c.key)}>
            <DataCellFullRow
              column={c}
              record={record}
              rowIndex={rowIndex}
              colSpan={regularColumns.length}
            />
          </tr>
        );
      })}
    </>
  );
};
