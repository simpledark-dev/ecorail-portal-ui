export type TScopeStore = {
  columns: TScopeColumnConfigItem[];
  data: any;
};

export type TScopeColumnConfigItem = {
  key: string;
  label: string;
  shortable?: boolean;
  renderHead?: () => React.ReactElement;
  renderCell?: (item: any) => React.ReactElement;
};
