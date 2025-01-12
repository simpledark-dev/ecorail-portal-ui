import { Spinner } from "@/components/spinner";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useScopeContext } from "../contexts/scope.context";

export const LoadingOverlay = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext?.store;
  const loading = scopeStore.use.loading();

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[10] flex items-center justify-center bg-white/[10%] backdrop-blur-[2px]"
        >
          <Spinner className="-translate-y-[32px]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
