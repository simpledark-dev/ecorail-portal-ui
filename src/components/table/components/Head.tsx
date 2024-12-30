import { useScopeContext } from "../contexts/scope.context";

export const Head = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const columns = scopeStore.use.columns();

  return (
    <thead>
      <tr>
        {columns.map((c) => {
          return <th key={c.key}>{c.label}</th>;
        })}
      </tr>
    </thead>
  );
};
