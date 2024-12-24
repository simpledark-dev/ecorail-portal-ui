export type TScopeStore = {
  instances: TDialogInstance[];
  create: (dialog: Omit<TDialogInstance, "id">) => void;
  remove: (id: string) => void;
};

export type TDialogInstance = {
  id: string;
  title: string;
  icon?: JSX.Element;
  body?: JSX.Element;
  actions?: (instance: TDialogInstance) => JSX.Element;
};
