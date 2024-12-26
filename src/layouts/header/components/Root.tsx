import { Breadcrumb } from "@/layouts/breadcrumb";
import { ScopeContextProvider, useScopeContext } from "../contexts/scope.context";
import { TScopeStore } from "../types";
import { Icons } from "@/components/icons";
import { UserMenu } from "./UserMenu";
import { LangSwap } from "./LangSwap";

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
    <header className="z-[99] flex items-center justify-between gap-5 bg-navy-700 px-6 py-3">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex items-center justify-center gap-6">
        <a
          href="https://www.railvision.ca"
          target="_blank"
          className="hidden items-center justify-center gap-2 opacity-50 xl:flex"
        >
          <p className="whitespace-nowrap text-sm font-normal text-neutral-100">
            RailVision Website
          </p>
          <Icons.TopRightArrow className="h-4 w-4 shrink-0 fill-neutral-100" />
        </a>
        <LangSwap />

        <UserMenu />
      </div>
    </header>
  );
};
