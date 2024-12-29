import { cn } from "@/utils/common.util";
import { ScopeContextProvider, useScopeContext } from "../contexts/scope.context";
import { TScopeStore } from "../types";
import { DateRangeSelect } from "./DateRangeSelect";
import { SnapSelect } from "./SnapSelect";
import moment from "moment";

export interface RootProps {
  title: TScopeStore["title"];
  disable?: TScopeStore["disable"];
  snapOptions: TScopeStore["snapOptions"];
  maxRange?: TScopeStore["maxRange"];
  selectedStartDate?: TScopeStore["selectedStartDate"];
  selectedEndDate?: TScopeStore["selectedEndDate"];
  onChange?: TScopeStore["onChange"];
}

export const Root = (props: RootProps) => {
  const {
    title,
    disable = false,
    snapOptions,
    selectedStartDate,
    selectedEndDate,
    maxRange = 30,
    onChange = () => {},
  } = props;

  const defaultStartDate = selectedStartDate || moment().subtract(3, "days").toDate();
  const defaultEndDate = selectedEndDate || moment().toDate();

  return (
    <ScopeContextProvider
      init={{
        title,
        disable,
        snapOptions,
        selectedStartDate: selectedStartDate || defaultStartDate,
        selectedEndDate: selectedEndDate || defaultEndDate,
        maxRange: maxRange,
        onChange,
      }}
    >
      <Entry />
    </ScopeContextProvider>
  );
};

const Entry = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const title = scopeStore.use.title();
  const disable = scopeStore.use.disable();
  const showCalendar = scopeStore.use.showCalendar();
  const showSnapOptions = scopeStore.use.showSnapOptions();

  return (
    <div className="relative z-[5]">
      <div>
        <p className="mb-2 block w-fit cursor-pointer text-sm font-semibold text-navy-700">
          {title}
        </p>

        <div
          className={cn(
            "w-fit rounded-[8px] border border-gray-400 drop-shadow-sm transition-colors duration-150",
            {
              "!border-blue-500": showCalendar || showSnapOptions,
            },
            { "cursor-not-allowed opacity-50": disable },
          )}
        >
          <div className="flex items-stretch justify-between">
            <SnapSelect />
            <div className="h-auto w-[1px] bg-gray-400" />
            <DateRangeSelect />
          </div>
        </div>
      </div>
    </div>
  );
};
