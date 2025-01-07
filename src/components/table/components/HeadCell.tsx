import { cn } from "@/utils/common.util";
import { TScopeColumnConfigItem } from "../types";
import { Icons } from "@/components/icons";

interface HeadCellProps<T> {
  column: TScopeColumnConfigItem<T>;
}

export const HeadCell = <T extends any>(props: HeadCellProps<T>) => {
  const { column } = props;

  const defaultRenderCell = () => {
    return <p>{column.label}</p>;
  };

  const renderSorting = () => {
    return (
      <button className="ml-2 shrink-0">
        <Icons.Sort className="h-[14px] w-[14px] fill-navy-300 transition-colors duration-150 group-hover:fill-navy-600" />
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
    >
      <div
        className={cn(
          "flex h-full items-center justify-start border-y border-gray-400 bg-gray-50 p-3 transition-colors duration-150",
          "text-left align-middle text-sm font-medium text-neutral-400",
          { "group-hover/cell:bg-gray-100": column.shortable },
        )}
      >
        {column.customHeadCell?.render ? column.customHeadCell.render(column) : defaultRenderCell()}
        {column.shortable && renderSorting()}
      </div>
    </th>
  );
};
