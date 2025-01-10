import { Spinner } from "@/components/spinner";
import { useScopeContext } from "../contexts/scope.context";

export const LoadingRow = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const columns = scopeStore.use.columns();

  const regularColumns = columns.filter((c) => !c.fullRow);

  return (
    <tr>
      <td colSpan={regularColumns.length}>
        <div className="relative my-[32px] flex items-center justify-center px-[20px]">
          <Spinner size={48} />
        </div>
      </td>
    </tr>
  );
};
