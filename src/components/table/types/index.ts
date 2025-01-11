export type TScopeStore<T> = {
  columns: TScopeColumnConfigItem<T>[];
  data: T[];
  displayData: T[];
  pagination:
    | {
        itemsPerPage: number;
        snapOptions?: TScopeSnapOptionItem[];
      }
    | undefined;
  currentPage: number;
  totalPages: number;
  showSnapOptions: boolean;
  selectedItemsPerPage: number;
  sortOption: {
    key: keyof T;
    direction: "asc" | "desc";
    compute?: (item: T) => string | number;
  } | null;
  loading: boolean;
  onPageChange: (page: number) => void;
};

export type TScopeColumnConfigItem<T> = {
  key?: keyof T;
  virtualKey?: {
    key: string;
    compute: (item: T) => string | number;
  };
  label: string;
  shortable?: boolean;
  truncate?: {
    maxWidth?: number;
    showTooltip?: boolean;
  };
  format?: (value: any) => string | React.ReactElement;
  fullRow?: boolean;
  show?: boolean;
  focus?: (item: T, index: number) => boolean;
  customHeadCell?: {
    attributes?: React.ThHTMLAttributes<"">;
    render?: (config: TScopeColumnConfigItem<T>) => React.ReactElement;
  };
  customDataCell?: {
    attributes?: React.TdHTMLAttributes<"td">;
    render?: (item: T, index: number) => React.ReactElement;
  };
};

export type TScopeSnapOptionItem = {
  id: string;
  label: string;
  itemsPerPage: number;
  action?: () => void;
};
