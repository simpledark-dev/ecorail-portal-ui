import { Button } from "@/components/button";
import { useScopeContext } from "../contexts/scope.context";

export const Controls = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const tempSelectedValues = scopeStore.use.tempSelectedValues();
  const onSelectedValuesChange = scopeStore.use.onSelectedValuesChange();

  const handleDoneClick = () => {
    scopeStore.setState({
      selectedValues: tempSelectedValues,
      showMenu: false,
    });
    onSelectedValuesChange(tempSelectedValues);
  };

  return (
    <div className="p-2">
      <Button onClick={handleDoneClick} variant={"blue"} className="w-full">
        Done
      </Button>
    </div>
  );
};
