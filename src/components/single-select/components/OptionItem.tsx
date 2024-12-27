import React from "react";
import { useScopeContext } from "../contexts/scope.context";
import { TScopeOptionConfigItem } from "../types";
import { cn } from "@/utils/common.util";
import _ from "lodash";

interface OptionItemProps {
  option: TScopeOptionConfigItem;
}

export const OptionItem = (props: OptionItemProps) => {
  const { option } = props;

  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const selectedValue = scopeStore.use.selectedValue();
  const onSelectedValueChange = scopeStore.use.onSelectedValueChange();

  const isSelected = React.useMemo(() => {
    return _.isEqual(selectedValue, option.value);
  }, [selectedValue]);

  const handleClickOption = () => {
    scopeStore.setState({ selectedValue: option.value, showMenu: false });
    onSelectedValueChange(option.value);
    option.action && option.action();
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
        { "enabled:hover:bg-blue-100 enabled:active:bg-blue-200": !isSelected },
        { "bg-blue-100": isSelected },
        { "opacity-50": option.disable },
      )}
      onClick={handleClickOption}
    >
      <p
        className={cn(
          "whitespace-nowrap text-sm font-medium text-navy-700 transition-colors duration-150",
          { "text-blue-500": isSelected },
        )}
      >
        {option.label}
      </p>
    </button>
  );
};
