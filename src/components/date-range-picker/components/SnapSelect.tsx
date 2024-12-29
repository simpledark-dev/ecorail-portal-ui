import { useScopeContext } from "../contexts/scope.context";
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
import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "@/components/icons";
import { SnapOptions } from "./SnapOptions";
import React from "react";
import _ from "lodash";

export const SnapSelect = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const disable = scopeStore.use.disable();
  const showSnapOptions = scopeStore.use.showSnapOptions();
  const snapOptions = scopeStore.use.snapOptions();
  const selectedSnapOptionId = scopeStore.use.selectedSnapOptionId();

  const instanceId = React.useRef(nanoid("alpha"));

  const selectedSnapOption = React.useMemo(() => {
    return snapOptions.find((v) => {
      return _.isEqual(v.id, selectedSnapOptionId);
    });
  }, [snapOptions, selectedSnapOptionId]);

  const { x, y, refs, strategy, context } = useFloating({
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift()],
    open: showSnapOptions,
    onOpenChange: (v) => {
      scopeStore.setState({ showSnapOptions: v });
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
    <>
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={() => {
          scopeStore.setState({ showSnapOptions: !showSnapOptions, showCalendar: false });
        }}
        disabled={disable}
        className="h-auto rounded-l-[8px] bg-white p-[12px] disabled:cursor-not-allowed"
        aria-expanded={showSnapOptions ? "true" : "false"}
        aria-haspopup="true"
        aria-controls={`snap-options-menu-${instanceId.current}`}
        aria-label="Select Snap Option"
      >
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center justify-start gap-3">
            <div className="shrink-0 fill-navy-700">
              <Icons.History className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className={cn("text-sm font-medium text-navy-700")}>
              {selectedSnapOption ? selectedSnapOption.label : "Custom"}
            </p>
          </div>
          <Icons.ChevronDown
            className={cn("h-5 w-5 shrink-0 fill-navy-700 transition-transform duration-150", {
              "rotate-180": showSnapOptions,
            })}
            aria-hidden="true"
          />
        </div>
      </button>

      <AnimatePresence>
        {showSnapOptions && (
          <motion.div
            id={`snap-options-menu-${instanceId.current}`}
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
            <SnapOptions />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
