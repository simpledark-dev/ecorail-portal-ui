import { useScopeContext } from "../contexts/scope.context";
import { SnapOptionItem } from "./SnapOptionItem";

export const SnapOptions = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const snapOptions = scopeStore.use.snapOptions();

  return (
    <div className="w-fit overflow-hidden rounded-[8px] border border-gray-400 bg-white drop-shadow-sm">
      {snapOptions.length === 0 && (
        <div className="px-[20px] py-[16px]">
          <p className="text-center text-sm text-gray-500">Data is Empty</p>
        </div>
      )}

      {snapOptions.length > 0 && (
        <ul className="my-2 max-h-[250px] space-y-1 overflow-auto">
          {snapOptions.map((option) => {
            return (
              <li key={option.id} role="listitem">
                <SnapOptionItem option={option} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
