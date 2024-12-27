export type TScopeStore = {
  title: string | React.ReactElement;
  icon: string | React.ReactElement;
  showMenu: boolean;
  options: TScopeOptionConfigItem[];
  searchInput: string;
  displayOptions: TScopeOptionConfigItem[];
  selectedOption: TScopeOptionConfigItem | null;
  onSelectedOptionChange: (option: TScopeOptionConfigItem) => void;
};

export type TScopeOptionConfigItem = {
  id: string;
  label: string;
  value: any;
  disable?: boolean;
  action?: () => void;
};
