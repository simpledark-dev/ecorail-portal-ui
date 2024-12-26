import React from "react";
import { useScopeContext } from "../contexts/scope.context";
import { TSOLine } from "./TSOLine";

export const TSOsLayer = React.memo(() => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const tsos = scopeStore.use.tsos();

  return (
    <>
      {tsos.map((tso) => (
        <TSOLine key={tso.tsoId} tso={tso} />
      ))}
    </>
  );
});
TSOsLayer.displayName = "UI.TSOsLayer";
