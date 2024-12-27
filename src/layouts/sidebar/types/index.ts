import React from "react";

export type TScopeStore = {
  company: {
    logo: React.ReactElement;
    logoSmall: React.ReactElement;
  };
  navItems: TScopeNavItem[];
  show: boolean;
  collapse: boolean;
  onCollapseChange: (collapse: boolean) => void;
  selectedItem: TScopeNavItem | null;
};

export type TScopeNavItem = {
  id: string;
  icon: (props: React.ComponentPropsWithoutRef<"svg">) => React.ReactElement;
  label: string;
  href: string;
};
