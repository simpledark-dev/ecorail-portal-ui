/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useScopeContext } from "../contexts/scope.context";
import { HeadCell } from "./HeadCell";

export const Head = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const columns = scopeStore.use.columns();

  const regularColumns = columns.filter((c) => !c.fullRow);

  return (
    <thead className="select-none">
      <tr
        css={css`
          th:first-of-type > div {
            padding-left: 20px;
            border-radius: 10px 0 0 10px;
            border-left: 1px solid #c5c8ce;
          }
          th:last-of-type > div {
            padding-right: 20px;
            border-right: 1px solid #c5c8ce;
            border-radius: 0 10px 10px 0;
          }
        `}
      >
        {regularColumns.map((c) => {
          return <HeadCell key={String(c.key)} column={c} />;
        })}
      </tr>
    </thead>
  );
};
