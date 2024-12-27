export type TScopeStore = {
  title: string | React.ReactElement;
  icon: string | React.ReactElement;
  showMenu: boolean;
  options: TScopeOptionConfigItem[];
  searchInput: string;
  displayOptions: TScopeOptionConfigItem[];
  selectedValue: any | null;
  onSelectedValueChange: (value: any) => void;
};

export type TScopeOptionConfigItem = {
  id: string;
  label: string;
  value: any;
  disable?: boolean;
  action?: () => void;
};
