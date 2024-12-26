export type TScopeStore = {
  user: TScopeUserData;
  breadcrumbItems: TScopeBreadcrumbItem[];
  userMenusItems: TScopeUserMenuItem[];
  langs: string[];
  currentLang: string;
  onLangChange: (lang: string) => void;
};

export type TScopeUserData = {
  email: string;
};

export type TScopeBreadcrumbItem = {
  label: string;
  href: string;
};

export type TScopeUserMenuItem = {
  icon: React.ReactElement;
  label: string;
  action: () => void;
};
