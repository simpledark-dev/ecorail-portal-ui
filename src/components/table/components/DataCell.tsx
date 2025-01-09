import { cn } from "@/utils/common.util";
import { TScopeColumnConfigItem } from "../types";
import { useFloating, offset, flip, shift, useHover, useInteractions } from "@floating-ui/react";
import React from "react";

interface DataCellProps<T> {
  column: TScopeColumnConfigItem<T>;
  record: T;
  rowIndex: number;
}

export const DataCell = <T extends any>(props: DataCellProps<T>) => {
  const { column, record, rowIndex } = props;

  const [showTooltip, setShowTooltip] = React.useState(false);
  const isFocused = column.focus?.(record, rowIndex);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    open: showTooltip,
    onOpenChange: (v) => {
      setShowTooltip(v);
    },
    middleware: [offset(4), flip(), shift()],
  });

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const defaultRenderCell = () => {
    let content = (record as any)[column.key];
    const truncate = column.truncate;

    if (column.format) {
      content = column.format(content);
    }

    return (
      <p
        ref={refs.setReference}
        {...getReferenceProps()}
        className={cn({ "overflow-hidden truncate": truncate })}
        style={{ maxWidth: truncate?.maxWidth }}
      >
        {content}
        {truncate && truncate.showTooltip && showTooltip && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-50 rounded border border-gray-300 bg-white p-2 shadow-lg"
          >
            {content}
          </div>
        )}
      </p>
    );
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
          "flex h-full items-center justify-start border-b border-gray-200 p-3 transition-colors duration-150",
          "text-left align-middle text-sm font-normal text-navy-700",
          { "group-hover/row:bg-gray-100": !isFocused },
          { "border-blue-200 bg-blue-50 group-hover/row:bg-blue-100": isFocused },
        )}
      >
        {column.customDataCell?.render
          ? column.customDataCell?.render(record, rowIndex)
          : defaultRenderCell()}
      </div>
    </td>
  );
};
