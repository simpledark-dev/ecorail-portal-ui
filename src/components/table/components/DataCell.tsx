import { cn } from "@/utils/common.util";
import { TScopeColumnConfigItem } from "../types";

interface DataCellProps<T> {
  column: TScopeColumnConfigItem<T>;
  record: T;
}

export const DataCell = <T extends any>(props: DataCellProps<T>) => {
  const { column, record } = props;

  const defaultRenderCell = () => {
    return <p>{(record as any)[column.key]}</p>;
  };

  return (
    <td
      {...(column.customDataCell?.attributes as any)}
      className={cn(
        "group/cell h-[1px] min-h-[1px] align-middle",
        column.customDataCell?.attributes?.className,
      )}
    >
      <div
        className={cn(
          "flex h-full items-center justify-start border-b border-gray-200 p-3 transition-colors duration-150 group-hover/row:bg-gray-100",
          "text-left align-middle text-sm font-normal text-navy-700",
        )}
      >
        {column.customDataCell?.render
          ? column.customDataCell?.render(record)
          : defaultRenderCell()}
      </div>
    </td>
  );
};
