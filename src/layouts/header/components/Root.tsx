import { ScopeContextProvider, useScopeContext } from "../contexts/scope.context";
import { TScopeStore } from "../types";
import { UserMenu } from "./UserMenu";
import { LangSwap } from "./LangSwap";
import { Breadcrumb } from "@/layouts/breadcrumb";
import { Icons } from "@/components/icons";

export interface RootProps {
  user: TScopeStore["user"];
  breadcrumbItems: TScopeStore["breadcrumbItems"];
  userMenusItems: TScopeStore["userMenusItems"];
  langs: TScopeStore["langs"];
  currentLang: TScopeStore["currentLang"];
  onLangChange: TScopeStore["onLangChange"];
}

export const Root = (props: RootProps) => {
  return (
    <ScopeContextProvider init={{ ...props }}>
      <Entry />
    </ScopeContextProvider>
  );
};

const Entry = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const breadcrumbItems = scopeStore.use.breadcrumbItems();

  return (
    <header className="sticky top-0 z-[99] flex items-center justify-between gap-5 bg-navy-700 py-3 pr-6">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex items-center justify-center gap-6">
        <a
          href="https://www.railvision.ca"
          target="_blank"
          className="group hidden items-center justify-center gap-2 !no-underline opacity-50 transition-all duration-150 hover:opacity-80 active:opacity-50 xl:flex"
        >
          <p className="whitespace-nowrap text-sm font-normal text-neutral-100 transition-all duration-150 group-hover:text-neutral-50">
            RailVision Website
          </p>
          <Icons.TopRightArrow className="h-4 w-4 shrink-0 fill-neutral-100 transition-all duration-150 group-hover:fill-neutral-50" />
        </a>

        <LangSwap />

        <UserMenu />
      </div>
    </header>
  );
};
