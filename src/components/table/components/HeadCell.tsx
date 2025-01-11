import { cn } from "@/utils/common.util";
import { TScopeColumnConfigItem, TScopeSortOption } from "../types";
import { Icons } from "@/components/icons";
import { useScopeContext } from "../contexts/scope.context";
import React from "react";

interface HeadCellProps<T> {
  column: TScopeColumnConfigItem<T>;
}

export const HeadCell = <T extends any>(props: HeadCellProps<T>) => {
  const { column } = props;

  const { store } = useScopeContext();
  const currentSort = store.use.sortOption();
  const onSortOptionChange = store.use.onSortOptionChange();

  const isCurrentSorting = React.useMemo(() => {
    if (column.key) {
      return currentSort?.key === column.key;
    }

    if (column.virtualKey) {
      return currentSort?.key === column.virtualKey.key;
    }

    return false;
  }, [currentSort, column.key, column.virtualKey]);

  const toggleSortOrder = () => {
    if (column.key) {
      if (currentSort?.key === column.key && currentSort.direction === "desc") {
        store.setState({ sortOption: null });
        return;
      }

      const newOrder =
        currentSort?.key === column.key && currentSort.direction === "asc" ? "desc" : "asc";
      const newSortOption: TScopeSortOption<T> = {
        key: column.key,
        direction: newOrder,
      };
      store.setState({ sortOption: newSortOption });
      onSortOptionChange(newSortOption);
    }

    if (column.virtualKey) {
      if (currentSort?.key === column.virtualKey.key && currentSort.direction === "desc") {
        store.setState({ sortOption: null });
        return;
      }

      const newOrder =
        currentSort?.key === column.virtualKey.key && currentSort.direction === "asc"
          ? "desc"
          : "asc";
      const newSortOption: TScopeSortOption<T> = {
        key: column.virtualKey.key,
        direction: newOrder,
        compute: column.virtualKey.compute,
      };
      store.setState({ sortOption: newSortOption });
      onSortOptionChange(newSortOption);
    }
  };

  const defaultRenderCell = () => {
    return <p className="grow">{column.label}</p>;
  };

  const renderSorting = () => {
    return (
      <button className="ml-2 shrink-0" onClick={toggleSortOrder}>
        {!isCurrentSorting && (
          <Icons.Sort className="h-[14px] w-[14px] fill-navy-300 transition-colors duration-150 group-hover:fill-navy-600" />
        )}
        {isCurrentSorting && currentSort?.direction === "asc" && (
          <Icons.SortUp className="h-[14px] w-[14px] fill-blue-600" />
        )}
        {isCurrentSorting && currentSort?.direction === "desc" && (
          <Icons.SortDown className="h-[14px] w-[14px] fill-blue-600" />
        )}
      </button>
    );
  };

  return (
    <th
      {...(column.customHeadCell?.attributes as any)}
      className={cn(
        "group/cell box-border h-[1px] min-h-[1px] overflow-hidden text-left align-middle",
        column.customHeadCell?.attributes?.className,
        {
          "cursor-pointer": column.shortable,
        },
      )}
      onClick={column.shortable && toggleSortOrder}
    >
      <div
        className={cn(
          "flex h-full items-center justify-start border-y border-gray-400 bg-gray-50 p-3 transition-colors duration-150",
          "align-middle text-sm font-medium text-inherit text-neutral-400",
          { "group-hover/cell:bg-gray-100": column.shortable },
          { "text-blue-600": isCurrentSorting },
        )}
      >
        {column.customHeadCell?.render ? column.customHeadCell.render(column) : defaultRenderCell()}
        {column.shortable && renderSorting()}
      </div>
    </th>
  );
};
