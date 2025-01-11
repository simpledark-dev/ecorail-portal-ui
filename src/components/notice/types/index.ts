export type TScopeStore = {
  instances: TNoticeInstance[];
  create: (notice: Omit<TNoticeInstance, "id">) => TNoticeInstance;
  remove: (id: string) => void;
};

export type TNoticeInstance = {
  id: string;
  title: string;
  closeable?: boolean;
  collapsible?: boolean;
  autoClose?: {
    timeout: number;
  };
  icon?: React.ReactElement;
  body?: React.ReactElement;
  actions?: (instance: TNoticeInstance) => React.ReactElement;
};
