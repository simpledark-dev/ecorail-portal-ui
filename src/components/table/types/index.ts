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
  onPageChange: (page: number) => void;
};

export type TScopeColumnConfigItem<T> = {
  key: keyof T;
  label: string;
  shortable?: boolean;
  customHeadCell?: {
    attributes?: React.ThHTMLAttributes<"">;
    render?: (config: TScopeColumnConfigItem<T>) => React.ReactElement;
  };
  customDataCell?: {
    attributes?: React.TdHTMLAttributes<"td">;
    render?: (item: T) => React.ReactElement;
  };
};

export type TScopeSnapOptionItem = {
  id: string;
  label: string;
  itemsPerPage: number;
  action?: () => void;
};
