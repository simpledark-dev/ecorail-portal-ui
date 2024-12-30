/** @jsxImportSource @emotion/react */
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useDismiss,
  useClick,
  useInteractions,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Calendar, { TileArgs } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useScopeContext } from "../contexts/scope.context";
import React from "react";
import { css } from "@emotion/react";
import moment from "moment";
import { useDevice } from "@/hooks/useDevice";
import { Button } from "@/components/button";
import { cn, nanoid } from "@/utils/common.util";
import { Icons } from "@/components/icons";

export const DateRangeSelect = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const disable = scopeStore.use.disable();
  const showCalendar = scopeStore.use.showCalendar();
  const maxRange = scopeStore.use.maxRange();
  const selectedStartDate = scopeStore.use.selectedStartDate();
  const selectedEndDate = scopeStore.use.selectedEndDate();
  const onChange = scopeStore.use.onChange();

  const instanceId = React.useRef(nanoid("alpha"));

  const [tempStartDate, setTempStartDate] = React.useState<Date | null>(null);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());

  const { isMobile } = useDevice();

  const { x, y, refs, strategy, context } = useFloating({
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift()],
    open: showCalendar,
    onOpenChange: (v) => {
      scopeStore.setState({ showCalendar: v });
    },
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context, {
    outsidePress: true,
  });

  const click = useClick(context, {
    enabled: false,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const tileClass = ({ date, view }: TileArgs) => {
    const today = moment().startOf("day");
    const normalizedDate = moment(date).startOf("day");

    if (view === "month") {
      if (normalizedDate.isAfter(today)) {
        return "lock-future";
      }
    }

    if (view === "month" && tempStartDate) {
      const maxDate = moment(tempStartDate).add(maxRange, "days").endOf("day");
      const startDate = moment(tempStartDate).startOf("day");

      if (normalizedDate.isBefore(startDate)) {
        return "lock-past";
      }

      if (normalizedDate.isAfter(maxDate)) {
        return "lock-future";
      }
    }

    return "";
  };

  const tileDisabled = ({ date, view }: TileArgs) => {
    if (view === "month" && tempStartDate) {
      const maxDate = moment(tempStartDate).add(maxRange, "days").endOf("day");
      const normalizedDate = moment(date).startOf("day");
      const startDate = moment(tempStartDate).startOf("day");

      if (normalizedDate.isBefore(startDate) || normalizedDate.isAfter(maxDate)) {
        return true;
      }
    }
    return false;
  };

  const handleSelect = () => {
    if (startDate && endDate) {
      scopeStore.setState({
        showCalendar: false,
        selectedStartDate: startDate,
        selectedEndDate: endDate,
      });
      onChange(startDate, endDate);
    }
  };

  const handleClear = () => {
    setTempStartDate(null);
    setStartDate(null);
    setEndDate(null);
  };

  const handleCalendarValueChange = (e: any) => {
    if (Array.isArray(e) && e.length === 2) {
      setStartDate(e[0]);
      setEndDate(e[1]);
      setTempStartDate(null);
    }
  };

  const handleCalendarClickDate = (e: Date) => {
    if (!tempStartDate) {
      setTempStartDate(e);
    }
  };

  React.useEffect(() => {
    if (!showCalendar) {
      setStartDate(selectedStartDate || new Date());
      setEndDate(selectedEndDate || new Date());
      setTempStartDate(null);
    }
  }, [showCalendar, selectedStartDate, selectedEndDate]);

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={() => {
          scopeStore.setState({ showCalendar: !showCalendar, showSnapOptions: false });
        }}
        disabled={disable}
        className={cn("h-auto rounded-r-[8px] bg-white p-[12px] disabled:cursor-not-allowed")}
        aria-haspopup="true"
        aria-controls={`date-range-picker-${instanceId.current}`}
        aria-label="Select Date Range"
      >
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center justify-start gap-3">
            <div className="shrink-0 fill-navy-700">
              <Icons.CalendarToday className="h-5 w-5" aria-hidden="true" />
            </div>
            <p
              className={cn("text-sm font-medium text-navy-700", {
                "opacity-50": !startDate || !endDate || tempStartDate,
              })}
            >
              <span>
                {tempStartDate || startDate
                  ? moment(tempStartDate || startDate).format("DD/MM/YYYY")
                  : "Pick start date"}
              </span>
              <span> - </span>
              <span>
                {!tempStartDate && endDate ? moment(endDate).format("DD/MM/YYYY") : "Pick end date"}
              </span>
            </p>
          </div>
          <Icons.ChevronDown
            className={cn("h-5 w-5 shrink-0 fill-navy-700 transition-transform duration-150", {
              "rotate-180": showCalendar,
            })}
            aria-hidden="true"
          />
        </div>
      </button>

      <AnimatePresence>
        {showCalendar && (
          <motion.div
            id={`date-range-picker-${instanceId.current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            className="z-[10]"
            role="menu"
          >
            <div
              className="max-w-[600px] rounded-[8px] border border-gray-400 bg-white drop-shadow-sm"
              css={css`
                & {
                  .lock-past,
                  .lock-future {
                    opacity: 0.5;
                    cursor: not-allowed !important;
                    background-color: transparent !important;
                  }
                  .react-calendar {
                    padding: 12px;
                    border: none;
                    background-color: transparent;
                    user-select: none;
                    padding: 0px;
                    color: #282c44;
                  }
                  button.react-calendar__navigation__label {
                    background-color: transparent !important;
                  }
                  .react-calendar__navigation__label {
                    font-size: 14px;
                    &:hover {
                      color: #535c8d;
                    }
                    pointer-events: ${tempStartDate ? "none" : "auto"};
                  }
                  .react-calendar__navigation__arrow {
                    border-radius: 50%;
                    width: 36px;
                    height: 36px;
                    min-width: 36px;
                    background-color: #f1f2f3;
                    &:hover {
                      background-color: #d3d5da !important;
                    }
                    &:focus:not(:hover) {
                      background-color: #f1f2f3 !important;
                    }
                  }
                  .react-calendar__navigation__prev2-button {
                    margin-right: 8px;
                  }
                  .react-calendar__navigation__next2-button {
                    margin-left: 8px;
                  }
                  .react-calendar__navigation {
                    border-bottom: solid 1px #c5c8ce;
                    margin-top: 8px;
                    padding-bottom: 8px;
                  }
                  .react-calendar__navigation,
                  .react-calendar__viewContainer {
                    padding-left: 12px;
                    padding-right: 12px;
                  }
                  .react-calendar__month-view__days__day.react-calendar__tile {
                    font-size: 12px;
                    padding: 8px 4px;
                    margin-top: 2px;
                    margin-bottom: 2px;
                  }
                  .react-calendar__tile--now:not(.react-calendar__tile--range):not(
                      .react-calendar__tile--hover
                    ) {
                    background-color: #f9c3c6;
                    color: #860d16;
                    border-radius: 8px;
                  }
                  .react-calendar__month-view__weekdays__weekday {
                    & > abbr {
                      color: #8793ab;
                      text-decoration: none;
                      font-size: 11px;
                    }
                  }

                  .react-calendar__tile--range {
                    background-color: #bbccec;
                    color: #254888;
                    font-weight: 700;
                  }
                  .react-calendar__tile:focus,
                  .react-calendar__tile--rangeStart,
                  .react-calendar__tile--rangeEnd {
                    background-color: #507ccf;
                    color: white;
                  }
                  .react-calendar__tile:hover,
                  .react-calendar__tile--range:hover {
                    background-color: #dbe4f5;
                    color: #254888;
                  }
                  .react-calendar__tile:not(.react-calendar__tile--range):not(
                      .react-calendar__tile--hover
                    ):hover {
                    border-radius: 8px;
                  }
                  .react-calendar--selectRange .react-calendar__tile--hover {
                    background-color: #dbe4f5;
                    color: #254888;
                  }
                  .react-calendar__tile--hoverStart,
                  .react-calendar__tile--rangeStart {
                    border-top-left-radius: 8px;
                    border-bottom-left-radius: 8px;
                  }
                  .react-calendar__tile--hoverEnd {
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                  }
                  .react-calendar__tile--rangeEnd:not(.react-calendar__tile--hoverStart) {
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                  }
                }
              `}
            >
              <Calendar
                value={[startDate, endDate]}
                onChange={handleCalendarValueChange}
                onClickDay={handleCalendarClickDate}
                showNeighboringMonth={false}
                showFixedNumberOfWeeks={false}
                showDoubleView={!isMobile}
                selectRange={true}
                tileClassName={tileClass}
                tileDisabled={tileDisabled}
                locale="en-EN"
              />

              <div className="flex items-center justify-end gap-2 p-[12px]">
                <Button variant={"gray-light"} onClick={handleClear}>
                  Clear
                </Button>
                <Button
                  variant={"navy-dark"}
                  disabled={!!tempStartDate || !startDate || !endDate}
                  onClick={handleSelect}
                >
                  Select
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
