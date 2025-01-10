import { useScopeContext } from "../contexts/scope.context";

export const EmptyDataRow = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const columns = scopeStore.use.columns();

  const regularColumns = columns.filter((c) => !c.fullRow);

  return (
    <tr>
      <td colSpan={regularColumns.length}>
        <div className="relative my-[32px] flex items-center justify-center px-[20px]">
          <p className="text-base font-medium text-neutral-600">No data to Display</p>
        </div>
      </td>
    </tr>
  );
};
