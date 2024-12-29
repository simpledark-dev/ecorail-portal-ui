import React from "react";
import { useScopeContext } from "../contexts/scope.context";
import { TScopeSnapOptionConfigItem } from "../types";
import { cn } from "@/utils/common.util";
import _ from "lodash";
import moment from "moment";

interface SnapOptionItemProps {
  option: TScopeSnapOptionConfigItem;
}

export const SnapOptionItem = (props: SnapOptionItemProps) => {
  const { option } = props;

  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const selectedSnapOptionId = scopeStore.use.selectedSnapOptionId();

  const isSelected = React.useMemo(() => {
    return _.isEqual(selectedSnapOptionId, option.id);
  }, [selectedSnapOptionId]);

  const handleClickOption = () => {
    if (option.rangeDaysFromNow !== null) {
      const currentDate = moment();
      const startDate = currentDate.clone().subtract(option.rangeDaysFromNow, "days");
      const endDate = currentDate.clone();

      console.log(startDate.toDate(), endDate.toDate());

      scopeStore.setState({
        selectedStartDate: startDate.toDate(),
        selectedEndDate: endDate.toDate(),
        selectedSnapOptionId: option.id,
        showSnapOptions: false,
      });
    }

    if (option.action) {
      option.action();
    }
  };

  return (
    <button
      type="button"
      tabIndex={0}
      aria-label={`Option: ${option.label}`}
      aria-selected={isSelected}
      className={cn(
        "w-full px-[20px] py-[8px] text-left transition-colors duration-150",
        { "enabled:hover:bg-blue-100 enabled:active:bg-blue-200": !isSelected },
        { "bg-blue-100": isSelected },
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
