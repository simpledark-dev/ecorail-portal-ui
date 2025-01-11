import { cn } from "@/utils/common.util";
import { TScopeColumnConfigItem } from "../types";
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
      store.setState({ sortOption: { key: column.key, direction: newOrder } });
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
      store.setState({
        sortOption: {
          key: column.virtualKey.key,
          direction: newOrder,
          compute: column.virtualKey.compute,
        },
      });
    }
  };

  const defaultRenderCell = () => {
    return <p>{column.label}</p>;
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
        "group/cell box-border h-[1px] min-h-[1px] overflow-hidden align-middle",
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
          "text-left align-middle text-sm font-medium text-neutral-400",
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
