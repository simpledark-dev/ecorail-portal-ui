export type TScopeStore = {
  title: string | React.ReactElement;
  disable: boolean;
  showSnapOptions: boolean;
  snapOptions: TScopeSnapOptionConfigItem[];
  selectedSnapOptionId: string | null;
  showCalendar: boolean;
  maxRange: number;
  selectedStartDate: Date;
  selectedEndDate: Date;
};

export type TScopeSnapOptionConfigItem = {
  id: string;
  label: string;
  rangeDaysFromNow: number | null;
  action?: () => void;
};
