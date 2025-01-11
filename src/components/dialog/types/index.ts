export type TScopeStore = {
  instances: TDialogInstance[];
  create: (dialog: Omit<TDialogInstance, "id">) => TDialogInstance;
  remove: (id: string) => void;
};

export type TDialogInstance = {
  id: string;
  title: string;
  icon?: React.ReactElement;
  body?: React.ReactElement;
  actions?: (instance: TDialogInstance) => React.ReactElement;
};
