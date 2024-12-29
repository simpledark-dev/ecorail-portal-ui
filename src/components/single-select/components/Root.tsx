import { Icons } from "@/components/icons";
import { ScopeContextProvider, useScopeContext } from "../contexts/scope.context";
import { TScopeStore } from "../types";
import { Options } from "./Options";
import React from "react";
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
import { cn, nanoid } from "@/utils/common.util";
import _ from "lodash";

export interface RootProps {
  title: TScopeStore["title"];
  disable?: TScopeStore["disable"];
  icon: TScopeStore["icon"];
  options: TScopeStore["options"];
  selectedValue?: TScopeStore["selectedValue"];
  onSelectedValueChange?: TScopeStore["onSelectedValueChange"];
}

export const Root = (props: RootProps) => {
  const {
    options,
    disable = false,
    selectedValue = null,
    onSelectedValueChange = () => {},
    ...rest
  } = props;

  return (
    <ScopeContextProvider
      init={{
        options,
        disable,
        selectedValue: selectedValue || options.length > 0 ? options[0].value : null,
        onSelectedValueChange,
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
  const selectedValue = scopeStore.use.selectedValue();

  const selectedOption = React.useMemo(() => {
    return options.find((v) => {
      return _.isEqual(v.value, selectedValue);
    });
  }, [options, selectedValue]);

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

  return (
    <div className="relative z-[5]">
      <div className="min-w-[180px]">
        <label
          className="mb-2 block w-fit cursor-pointer text-sm font-semibold text-navy-700"
          htmlFor={`single-select-${instanceId}`}
        >
          {title}
        </label>
        <button
          id={`single-select-${instanceId}`}
          className={cn(
            "w-fit cursor-pointer rounded-[8px] border border-gray-400 bg-white px-[16px] py-[12px] drop-shadow-sm transition-colors duration-150",
            { "!border-blue-500": showMenu },
            { "!cursor-not-allowed opacity-50": disable },
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
              <p className="bg-transparent text-sm font-medium text-navy-700 placeholder:text-navy-400">
                {selectedOption?.label || "--"}
              </p>
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
