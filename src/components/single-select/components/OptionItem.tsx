import React from "react";
import { useScopeContext } from "../contexts/scope.context";
import { TScopeOptionConfigItem } from "../types";
import { cn } from "@/utils/common.util";

interface OptionItemProps {
  option: TScopeOptionConfigItem;
}

export const OptionItem = (props: OptionItemProps) => {
  const { option } = props;

  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const selectedOption = scopeStore.use.selectedOption();
  const onSelectedOptionChange = scopeStore.use.onSelectedOptionChange();

  const isSelected = React.useMemo(() => {
    return selectedOption?.id === option.id;
  }, [selectedOption]);

  const handleClickOption = () => {
    scopeStore.setState({ selectedOption: option, showMenu: false });
    onSelectedOptionChange(option);
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
