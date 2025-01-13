import { useScopeContext } from "../contexts/scope.context";
import { Controls } from "./Controls";
import { OptionItem } from "./OptionItem";
import { SearchBar } from "./SearchBar";
import { SelectAll } from "./SelectAll";

export const Options = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const searchInput = scopeStore.use.searchInput();
  const displayOptions = scopeStore.use.displayOptions();

  return (
    <div className="w-fit min-w-[200px] overflow-hidden rounded-[8px] border border-gray-400 bg-white drop-shadow-sm">
      <SearchBar />
      <div className="h-[1px] w-full bg-gray-400" />

      {displayOptions.length > 0 && (
        <>
          <SelectAll />
          <div className="h-[1px] w-full bg-gray-400" />
        </>
      )}

      {displayOptions.length === 0 && searchInput.length === 0 && (
        <div className="px-[20px] py-[16px]">
          <p className="text-center text-sm text-gray-500">Date is Empty</p>
        </div>
      )}

      {displayOptions.length === 0 && searchInput.length > 0 && (
        <div className="px-[20px] py-[16px]">
          <p className="text-center text-sm text-gray-500">No Results</p>
        </div>
      )}

      {displayOptions.length > 0 && (
        <ul className="my-2 max-h-[250px] space-y-1 overflow-auto">
          {displayOptions.map((option) => {
            return (
              <li key={option.id} role="listitem">
                <OptionItem option={option} />
              </li>
            );
          })}
        </ul>
      )}

      <div className="h-[1px] w-full bg-gray-400" />
      <Controls />
    </div>
  );
};
