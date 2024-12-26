import { useScopeContext } from "../contexts/scope.context";

export const LangSwap = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const langs = scopeStore.use.langs();
  const currentLang = scopeStore.use.currentLang();
  const onLangChange = scopeStore.use.onLangChange();

  const getNextLang = () => {
    const currentLangIndex = langs.indexOf(currentLang);
    const nextLangIndex = (currentLangIndex + 1) % langs.length;
    return langs[nextLangIndex];
  };

  const handleLangChange = () => {
    const nextLang = getNextLang();
    onLangChange(nextLang);
  };

  return (
    <button
      onClick={handleLangChange}
      className="group rounded-[4px] p-2 transition-colors duration-150 hover:bg-white/15 active:bg-white/30"
    >
      <p className="text-sm font-medium uppercase text-neutral-100 transition-colors duration-150 group-hover:text-neutral-0">
        {currentLang.toUpperCase()}
      </p>
    </button>
  );
};
