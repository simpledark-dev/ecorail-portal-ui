import { cn } from "@/utils/common.util";
import { motion } from "framer-motion";
import React from "react";

export interface CollapseProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  isOpen?: boolean;
}

export const Collapse = (props: CollapseProps) => {
  const { children, isOpen = false, className, ...rest } = props;

  return (
    <motion.div
      initial={"collapsed"}
      animate={isOpen ? "expanded" : "collapsed"}
      variants={{
        expanded: {
          opacity: 1,
          height: "auto",
          transition: {
            duration: 0.2,
          },
        },
        collapsed: {
          opacity: 0,
          height: 0,
          transition: {
            duration: 0.2,
          },
        },
      }}
      className={cn("overflow-hidden", className)}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  );
};
