import React from "react";
import { TScopeNavItem } from "../types";
import { Link } from "react-router-dom";
import { useScopeContext } from "../contexts/scope.context";
import { cn } from "@/utils/common.util";
import { motion } from "framer-motion";

interface NavItemProps {
  item: TScopeNavItem;
}

export const NavItem = (props: NavItemProps) => {
  const { item } = props;

  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const collapse = scopeStore.use.collapse();
  const selectedItem = scopeStore.use.selectedItem();

  const isSelected = React.useMemo(() => {
    return selectedItem?.id === item.id;
  }, [selectedItem]);

  const handleClick = () => {
    scopeStore.setState({ selectedItem: item });
  };

  return (
    <Link
      to={item.href}
      className={cn(
        "group flex w-full items-center justify-start gap-3 overflow-hidden rounded-[4px] p-3 !no-underline transition-colors duration-150",
        { "bg-white": isSelected },
        { "hover:bg-white/[15%] active:bg-white/[30%]": !isSelected },
      )}
      onClick={handleClick}
    >
      {React.createElement(item.icon, {
        className: cn(
          "w-6 h-6 shrink-0 fill-neutral-200  duration-150 transition-colors",
          {
            "fill-navy-700": isSelected,
          },
          { "group-hover:fill-neutral-0": !isSelected },
        ),
      })}
      <motion.p
        initial={{ opacity: 1, width: "auto" }}
        animate={collapse ? { opacity: 0, width: 0 } : { opacity: 1, width: "auto" }}
        className={cn(
          "whitespace-nowrap text-sm font-medium text-neutral-200 transition-colors duration-150",
          {
            "text-navy-700": isSelected,
          },
          {
            "group-hover:text-neutral-0": !isSelected,
          },
        )}
      >
        {item.label}
      </motion.p>
    </Link>
  );
};
