/* eslint-disable react-hooks/rules-of-hooks */
import { useScopeContext } from "../contexts/scope.context";
import { TDialogInstance } from "../types";

export const useDialog = () => {
  const { store } = useScopeContext();

  const create = (dialog: Omit<TDialogInstance, "id">) => {
    store.getState().create(dialog);
  };

  const remove = (id: string) => {
    store.getState().remove(id);
  };

  return {
    create,
    remove,
  };
};
