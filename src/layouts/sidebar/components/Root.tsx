import { Icons } from "@/components/icons";
import { ScopeContextProvider, useScopeContext } from "../contexts/scope.context";
import { TScopeStore } from "../types";
import { NavItem } from "./NavItem";
import { cn } from "@/utils/common.util";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export interface RootProps {
  company: TScopeStore["company"];
  navItems: TScopeStore["navItems"];
  show?: TScopeStore["show"];
  collapse?: TScopeStore["collapse"];
  onCollapseChange?: TScopeStore["onCollapseChange"];
}

export const Root = (props: RootProps) => {
  const { show = true, collapse = false, onCollapseChange = () => {}, ...rest } = props;

  return (
    <ScopeContextProvider init={{ show, collapse, onCollapseChange, ...rest }}>
      <Entry />
    </ScopeContextProvider>
  );
};

const Entry = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const company = scopeStore.use.company();
  const navItems = scopeStore.use.navItems();
  const show = scopeStore.use.show();
  const collapse = scopeStore.use.collapse();
  const onCollapse = scopeStore.use.onCollapseChange();

  const toggleCollapse = () => {
    scopeContext.store.setState({ collapse: !collapse });
    onCollapse(!collapse);
  };

  return (
    <motion.div
      initial={{ marginLeft: 0 }}
      animate={show ? { marginLeft: 0 } : collapse ? { marginLeft: -64 } : { marginLeft: -256 }}
      className={cn("z-[99]", { "pointer-events-auto": show }, { "pointer-events-none": !show })}
    >
      <motion.div
        initial={
          collapse
            ? { width: 64, paddingLeft: 8, paddingRight: 8 }
            : { width: 256, paddingLeft: 20, paddingRight: 20 }
        }
        animate={
          collapse
            ? { width: 64, paddingLeft: 8, paddingRight: 8 }
            : { width: 256, paddingLeft: 20, paddingRight: 20 }
        }
        className={cn("fixed bottom-0 top-0 h-full w-fit bg-navy-700 py-5")}
      >
        <div className="flex h-full flex-col items-stretch justify-between gap-5">
          <div className="flex flex-col items-stretch justify-start gap-5">
            <Link to={"/"} className="flex items-center justify-center py-2">
              {collapse ? company.logoSmall : company.logo}
            </Link>

            <nav>
              <ul className="space-y-2">
                {navItems.map((item) => {
                  return (
                    <li key={item.id}>
                      <NavItem item={item} />
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <button
            type="button"
            onClick={toggleCollapse}
            className="flex items-center justify-end rounded-[4px] px-2 py-1 transition-colors duration-150 hover:bg-white/[15%] active:bg-white/[30%]"
          >
            <Icons.ChevronLeft
              className={cn("h-[28px] w-[28px] shrink-0 fill-neutral-50", {
                "rotate-180": collapse,
              })}
            />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
