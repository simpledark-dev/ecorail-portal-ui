import { cn } from "@/utils/common.util";
import { TScopeColumnConfigItem } from "../types";

interface DataCellFullRowProps<T> {
  column: TScopeColumnConfigItem<T>;
  record: T;
  colSpan: number;
  rowIndex: number;
}

export const DataCellFullRow = <T extends any>(props: DataCellFullRowProps<T>) => {
  const { column, record, rowIndex, colSpan } = props;

  const isFocused = column.focus?.(record, rowIndex);

  return (
    <td
      {...(column.customDataCell?.attributes as any)}
      className={cn(
        "group/cell h-[1px] min-h-[1px] align-middle",
        column.customDataCell?.attributes?.className,
      )}
      colSpan={colSpan}
    >
      <div
        className={cn(
          "border border-t-0 border-transparent text-left align-middle text-sm font-normal text-navy-700",
          {
            "border-blue-200": isFocused,
          },
        )}
      >
        {column.customDataCell?.render ? column.customDataCell?.render(record, rowIndex) : <></>}
      </div>
    </td>
  );
};
