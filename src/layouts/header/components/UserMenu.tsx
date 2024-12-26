import React from "react";
import { useScopeContext } from "../contexts/scope.context";
import {
  useFloating,
  offset,
  flip,
  shift,
  useDismiss,
  useClick,
  useInteractions,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "@/components/menu";

export const UserMenu = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const user = scopeStore.use.user();
  const userMenuItems = scopeStore.use.userMenusItems();

  const [isOpen, setIsOpen] = React.useState(false);

  const { x, y, refs, strategy, context } = useFloating({
    placement: "bottom-end",
    middleware: [offset(8), flip(), shift()],
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const dismiss = useDismiss(context, {
    outsidePress: true,
  });

  const click = useClick(context, {
    enabled: false,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-center gap-2"
      >
        <p className="hidden text-sm font-medium text-neutral-100 transition-colors duration-150 group-hover:text-neutral-0 md:block">
          {user.email}
        </p>
        <img
          className="h-8 w-8 shrink-0 transition-all duration-150 group-hover:contrast-125"
          src="/images/avatar-default.png"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            className="w-48 rounded-md bg-navy-700 shadow-lg"
          >
            <Menu
              items={userMenuItems.map((item) => ({
                ...item,
                action: () => {
                  item.action();
                  setIsOpen(false);
                },
              }))}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
