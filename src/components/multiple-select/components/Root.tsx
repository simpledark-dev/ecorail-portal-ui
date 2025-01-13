import _ from "lodash";
import { ScopeContextProvider, useScopeContext } from "../contexts/scope.context";
import { TScopeStore } from "../types";
import React from "react";
import { cn, nanoid } from "@/utils/common.util";
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
import { Icons } from "@/components/icons";
import { AnimatePresence, motion } from "framer-motion";
import { Options } from "./Options";

export interface RootProps {
  title: TScopeStore["title"];
  disable?: TScopeStore["disable"];
  icon: TScopeStore["icon"];
  options: TScopeStore["options"];
  selectedValues?: TScopeStore["selectedValues"];
  onSelectedValuesChange?: TScopeStore["onSelectedValuesChange"];
}

export const Root = (props: RootProps) => {
  const {
    options,
    disable = false,
    selectedValues = [],
    onSelectedValuesChange = () => {},
    ...rest
  } = props;

  return (
    <ScopeContextProvider
      init={{
        options,
        disable,
        selectedValues,
        onSelectedValuesChange,
        ...rest,
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
  const icon = scopeStore.use.icon();
  const disable = scopeStore.use.disable();
  const showMenu = scopeStore.use.showMenu();
  const options = scopeStore.use.options();
  const selectedValues = scopeStore.use.selectedValues();
  const onSelectedValuesChange = scopeStore.use.onSelectedValuesChange();
  const selectedOptions = React.useMemo(() => {
    return options.filter((v) => {
      return selectedValues.some((selectedValue) => _.isEqual(selectedValue, v.value));
    });
  }, [options, selectedValues]);

  const instanceId = React.useRef(nanoid("alpha"));

  const { x, y, refs, strategy, context } = useFloating({
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift()],
    open: showMenu,
    onOpenChange: (v) => {
      scopeStore.setState({ showMenu: v });
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

  const handleClear = () => {
    scopeStore.setState({ selectedValues: [] });
    onSelectedValuesChange([]);
  };

  return (
    <div className="relative z-[5]">
      <div>
        <label
          className="mb-2 block w-fit cursor-pointer text-sm font-semibold text-navy-700"
          htmlFor={`single-select-${instanceId.current}`}
        >
          {title}
        </label>
        <button
          id={`single-select-${instanceId.current}`}
          className={cn(
            "w-fit min-w-[150px] cursor-pointer rounded-[8px] border border-gray-400 bg-white px-[16px] py-[12px] drop-shadow-sm transition-colors duration-150",
            { "!border-blue-500": showMenu },
            { "!cursor-not-allowed opacity-50": disable },
            { "py-[8px]": selectedOptions.length > 0 },
          )}
          type="button"
          disabled={disable}
          ref={refs.setReference}
          {...getReferenceProps()}
          onClick={() => {
            scopeStore.setState({ showMenu: !showMenu });
          }}
          tabIndex={0}
          aria-haspopup="listbox"
          aria-expanded={true}
        >
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center justify-start gap-3">
              <div className="shrink-0 fill-navy-700">{icon}</div>
              <div
                className={cn("flex items-center justify-center gap-3 rounded-[8px]", {
                  "bg-neutral-50": selectedOptions.length > 0,
                })}
              >
                <p
                  className={cn("bg-transparent text-sm font-medium text-navy-700", {
                    "px-3 py-1": selectedOptions.length > 0,
                  })}
                >
                  {selectedOptions.length > 0 ? `${selectedOptions.length} item(s) selected` : "--"}
                </p>

                {selectedOptions.length > 0 && (
                  <button
                    className="group shrink-0 border-l border-gray-400 px-2 py-1"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClear();
                    }}
                  >
                    <Icons.Close className="h-4 w-4 shrink-0 fill-navy-600 transition-colors duration-150 group-hover:fill-navy-400 group-active:fill-navy-700" />
                  </button>
                )}
              </div>
            </div>
            <Icons.ChevronDown
              className={cn("h-5 w-5 shrink-0 fill-navy-700 transition-transform duration-150", {
                "rotate-180": showMenu,
              })}
              aria-hidden="true"
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
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
          >
            <Options />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
