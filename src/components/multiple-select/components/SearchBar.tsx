import { Icons } from "@/components/icons";
import { useScopeContext } from "../contexts/scope.context";
import React from "react";

export const SearchBar = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const searchInput = scopeStore.use.searchInput();

  const handleSearchInputChange = (value: string) => {
    scopeStore.setState({ searchInput: value });
  };

  React.useEffect(() => {
    return () => {
      scopeStore.setState({ searchInput: "" });
    };
  }, []);

  return (
    <div className="px-[20px] py-[12px]">
      <div className="relative">
        <div className="flex shrink-0 items-center justify-start gap-2">
          <Icons.Search className="h-5 w-5 shrink-0" aria-label="Search" />
          <input
            autoFocus
            value={searchInput}
            type="text"
            className="!w-fit !min-w-0 bg-transparent pr-[20px] text-sm font-medium text-navy-700 placeholder:font-normal placeholder:text-gray-500"
            placeholder="Search"
            onChange={(e) => {
              handleSearchInputChange(e.target.value);
            }}
          />
        </div>
        {searchInput.length > 0 && (
          <button
            className="group absolute right-0 top-1/2 shrink-0 -translate-y-1/2"
            onClick={() => {
              scopeStore.setState({ searchInput: "" });
            }}
          >
            <Icons.Close
              className="h-4 w-4 fill-navy-600 transition-colors duration-150 group-hover:fill-navy-400 group-active:fill-navy-700"
              aria-label="Clear search"
            />
          </button>
        )}
      </div>
    </div>
  );
};
