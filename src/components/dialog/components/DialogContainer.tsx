/** @jsxImportSource @emotion/react */
import { useResizeObserver } from "@/hooks/useResizeObserver";
import { useScopeContext } from "../contexts/scope.context";
import { css } from "@emotion/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreventScroll } from "@/hooks/usePreventScroll";
import { cn } from "@/utils/common.util";
import { DialogInstance } from "./DialogInstance";

export const DialogContainer = () => {
  const scopeContext = useScopeContext();
  const instances = scopeContext.store.use.instances();

  const { ref: elContainerRef, rect: elContainerRect } = useResizeObserver<HTMLDivElement>();

  usePreventScroll(instances.length > 0);

  return (
    <div
      ref={elContainerRef}
      className={cn("absolute inset-0 z-[99999] h-full w-full", {
        "pointer-events-none select-none": instances.length === 0,
      })}
    >
      <AnimatePresence>
        {instances.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <ul
              className="fixed m-0 h-full list-none overflow-hidden bg-navy-600/[20%] p-0"
              css={css`
                width: ${elContainerRect ? elContainerRect.width : 0}px;
              `}
            >
              {instances.map((i) => {
                return (
                  <li key={i.id}>
                    <DialogInstance instance={i} />
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
