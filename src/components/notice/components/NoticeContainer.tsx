/** @jsxImportSource @emotion/react */
import { useResizeObserver } from "@/hooks/useResizeObserver";
import { useScopeContext } from "../contexts/scope.context";
import { css } from "@emotion/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreventScroll } from "@/hooks/usePreventScroll";
import { cn } from "@/utils/common.util";
import { NoticeInstance } from "./NoticeInstance";

export const NoticeContainer = () => {
  const scopeContext = useScopeContext();
  const instances = scopeContext.store.use.instances();

  const { ref: elContainerRef, rect: elContainerRect } = useResizeObserver<HTMLDivElement>();

  usePreventScroll(instances.length > 0);

  return (
    <div
      ref={elContainerRef}
      className={cn("absolute z-[99999]", {
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
            className="absolute"
          >
            <ul
              className="fixed bottom-[64px] left-0 right-0 m-0 mx-auto h-auto !w-full space-y-2 p-0 px-[32px] lg:left-[64px] lg:mx-0 lg:w-fit lg:px-0"
              css={css`
                width: ${elContainerRect ? elContainerRect.width : 0}px;
              `}
            >
              {instances.map((i) => {
                return (
                  <li key={i.id}>
                    <NoticeInstance instance={i} />
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
