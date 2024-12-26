import React from "react";
import { Breadcrumb } from "../breadcrumb";
import { AnimatePresence, motion } from "framer-motion";
import {
  useFloating,
  offset,
  flip,
  shift,
  useDismiss,
  useClick,
  useInteractions,
} from "@floating-ui/react";
import { Icons } from "@/components/icons";
import { Menu } from "@/components/menu";

interface HeaderProps {}

export const Header = (props: HeaderProps) => {
  const {} = props;

  const breadcrumbItems = [
    { label: "Via Rail", href: "/" },
    { label: "Trip Review", href: "/" },
  ];

  return (
    <header className="flex items-center justify-between gap-5 bg-navy-700 px-6 py-3">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex items-center justify-center gap-8">
        <a
          href="https://www.railvision.ca"
          className="hidden items-center justify-center gap-2 lg:flex"
        >
          <p className="text-sm text-neutral-100">RailVision Website</p>
          <Icons.TopRightArrow className="h-4 w-4 shrink-0 fill-neutral-100" />
        </a>
        <UserMenu email="gael.duong@railvision.ca" />
      </div>
    </header>
  );
};

interface UserMenuProps {
  email: string;
}

export const UserMenu = ({ email }: UserMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const userMenuItems = [
    {
      icon: <Icons.AdminPanel className="h-5 w-5 fill-current" />,
      label: "Admin",
      action: () => {
        setIsOpen(false);
      },
    },
    {
      icon: <Icons.Logout className="h-5 w-5 fill-current" />,
      label: "Logout",
      action: () => {
        setIsOpen(false);
      },
    },
  ];

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
        <p className="hidden text-sm text-neutral-100 transition-colors duration-150 group-hover:text-neutral-0 md:block">
          {email}
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
            <Menu items={userMenuItems} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
