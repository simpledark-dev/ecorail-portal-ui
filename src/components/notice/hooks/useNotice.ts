/* eslint-disable react-hooks/rules-of-hooks */
import { useScopeContext } from "../contexts/scope.context";
import { TNoticeInstance } from "../types";

export const useNotice = () => {
  const { store } = useScopeContext();

  const create = (notice: Omit<TNoticeInstance, "id">) => {
    return store.getState().create(notice);
  };

  const remove = (id: string) => {
    store.getState().remove(id);
  };

  return {
    create,
    remove,
  };
};
