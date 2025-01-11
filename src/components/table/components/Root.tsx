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
  loading?: TScopeStore<T>["loading"];
  sortOption?: TScopeStore<T>["sortOption"];
  onPageChange?: TScopeStore<T>["onPageChange"];
}

export const Root = <T extends any>(props: RootProps<T>) => {
  const {
    pagination = undefined,
    currentPage = 1,
    loading = false,
    sortOption = null,
    onPageChange = () => {},
    ...rest
  } = props;

  return (
    <ScopeContextProvider
      init={{ pagination, currentPage, onPageChange, loading, sortOption, ...(rest as any) }}
    >
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
      <div className="grid grid-cols-12 rounded-[12px] border border-gray-400 bg-white px-[20px] py-[32px] drop-shadow-sm">
        <div className="col-span-12 overflow-auto">
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
        <div className="flex items-center justify-end">
          <Pagination />
        </div>
      )}
    </div>
  );
};
