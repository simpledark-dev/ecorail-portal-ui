import React from "react";
import { TScopeOptionConfigItem } from "../types";
import { useScopeContext } from "../contexts/scope.context";
import _ from "lodash";
import { cn } from "@/utils/common.util";
import { Checkbox } from "@/components/checkbox";

interface OptionItemProps {
  option: TScopeOptionConfigItem;
}

export const OptionItem = (props: OptionItemProps) => {
  const { option } = props;

  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const tempSelectedValues = scopeStore.use.tempSelectedValues();
  const isSelected = React.useMemo(() => {
    return tempSelectedValues.some((value) => _.isEqual(value, option.value));
  }, [tempSelectedValues]);

  const handleClickOption = () => {
    if (isSelected) {
      scopeStore.setState({
        tempSelectedValues: tempSelectedValues.filter((value) => !_.isEqual(value, option.value)),
      });
    } else {
      scopeStore.setState({ tempSelectedValues: [...tempSelectedValues, option.value] });
    }
  };

  return (
    <button
      type="button"
      tabIndex={0}
      aria-label={`Option: ${option.label}`}
      aria-selected={isSelected}
      disabled={option.disable}
      className={cn(
        "w-full px-[20px] py-[8px] text-left transition-colors duration-150",
        { "enabled:hover:bg-blue-50 enabled:active:bg-blue-100": !isSelected },
        { "bg-blue-100": isSelected },
        { "opacity-50": option.disable },
      )}
      onClick={handleClickOption}
    >
      <div className="flex items-center justify-start gap-4">
        <Checkbox as="div" label={option.label} checked={isSelected} size={"sm"} />
        <p
          className={cn(
            "whitespace-nowrap text-sm font-medium text-navy-700 transition-colors duration-150",
            { "text-blue-500": isSelected },
          )}
        >
          {option.label}
        </p>
      </div>
    </button>
  );
};
