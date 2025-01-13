import React from "react";
import { useScopeContext } from "../contexts/scope.context";
import { cn } from "@/utils/common.util";
import { Checkbox } from "@/components/checkbox";
import _ from "lodash";

export const SelectAll = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const displayOptions = scopeStore.use.displayOptions();
  const tempSelectedValues = scopeStore.use.tempSelectedValues();

  const isSelected = React.useMemo(() => {
    const selectedValues = tempSelectedValues.sort();
    const optionValues = displayOptions.map((option) => option.value).sort();
    return _.isEqual(selectedValues, optionValues);
  }, [tempSelectedValues]);

  const handleSelectAll = () => {
    if (isSelected) {
      scopeStore.setState({ tempSelectedValues: [] });
    } else {
      scopeStore.setState({ tempSelectedValues: displayOptions.map((option) => option.value) });
    }
  };

  return (
    <button
      type="button"
      tabIndex={0}
      aria-label={`Select All`}
      aria-selected={isSelected}
      className={cn(
        "my-1 w-full px-[20px] py-[8px] text-left transition-colors duration-150",
        { "enabled:hover:bg-blue-50 enabled:active:bg-blue-100": !isSelected },
        { "bg-blue-100": isSelected },
      )}
      onClick={handleSelectAll}
    >
      <div className="flex items-center justify-start gap-4">
        <Checkbox as="div" label={`Select All`} checked={isSelected} size={"sm"} />
        <p
          className={cn(
            "whitespace-nowrap text-sm font-medium text-navy-700 transition-colors duration-150",
            { "text-blue-500": isSelected },
          )}
        >
          Select All
        </p>
      </div>
    </button>
  );
};
