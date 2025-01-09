import { ScopeContextProvider, useScopeContext } from "../contexts/scope.context";
import { TScopeStore } from "../types";
import { Body } from "./Body";
import { Head } from "./Head";
import { Pagination } from "./Pagination";

export interface RootProps<T> {
  columns: TScopeStore<T>["columns"];
  data: TScopeStore<T>["data"];
  pagination?: TScopeStore<T>["pagination"];
  currentPage?: TScopeStore<T>["currentPage"];
  onPageChange?: TScopeStore<T>["onPageChange"];
}

export const Root = <T extends any>(props: RootProps<T>) => {
  const { pagination = undefined, currentPage = 1, onPageChange = () => {}, ...rest } = props;

  return (
    <ScopeContextProvider init={{ pagination, currentPage, onPageChange, ...(rest as any) }}>
      <Entry />
    </ScopeContextProvider>
  );
};

const Entry = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const pagination = scopeStore.use.pagination();

  return (
    <div className="space-y-4">
      <div className="rounded-[12px] border border-gray-400 bg-white px-5 py-8 drop-shadow-sm">
        <div className="overflow-auto">
          <table
            cellSpacing={0}
            cellPadding={0}
            className="table w-full table-auto border-collapse"
          >
            <Head />
            <Body />
          </table>
        </div>
      </div>

      {pagination && (
        <div className="float-right">
          <Pagination />
        </div>
      )}
    </div>
  );
};
