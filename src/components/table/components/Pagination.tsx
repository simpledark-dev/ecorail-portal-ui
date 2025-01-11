/** @jsxImportSource @emotion/react */
import { Icons } from "@/components/icons";
import { cn, getPagination, nanoid } from "@/utils/common.util";
import React from "react";
import { css } from "@emotion/react";
import { useDevice } from "@/hooks/useDevice";
import { TScopeSnapOptionItem } from "../types";
import { useScopeContext } from "../contexts/scope.context";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useDismiss,
  useClick,
  useInteractions,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";

export const Pagination = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const totalPages = scopeStore.use.totalPages();
  const currentPage = scopeStore.use.currentPage();
  const onPageChange = scopeStore.use.onPageChange();
  const pagination = scopeStore.use.pagination();

  const instanceId = React.useRef(nanoid("alpha"));

  const { isMobile } = useDevice();

  const pages = getPagination(currentPage!, totalPages, isMobile ? 1 : 2);

  const handleOnPageChange = (page: number) => {
    onPageChange(page);
    scopeStore.setState({ currentPage: page });
  };

  const handleGoFirstPage = () => {
    handleOnPageChange(1);
  };

  const handleGoLastPage = () => {
    handleOnPageChange(totalPages);
  };

  const handleGoPrevPage = () => {
    handleOnPageChange(Math.max(1, currentPage! - 1));
  };

  const handleGoNextPage = () => {
    handleOnPageChange(Math.min(totalPages, currentPage! + 1));
  };

  return (
    <div
      id={`el--pagination-${instanceId.current}`}
      className="flex select-none flex-row flex-nowrap items-center justify-center gap-5 rounded-[12px] border border-gray-400 bg-white px-[12px] py-[8px] drop-shadow-sm"
    >
      <ul
        className="flex items-center justify-start gap-1"
        css={css`
          li {
            button {
              display: flex;
              align-items: center;
              justify-content: center;
              min-width: 32px;
              min-height: 32px;
            }
          }
        `}
      >
        {/* First button */}
        <li id={`navigation__fist-${instanceId.current}`}>
          <button
            disabled={currentPage === 1}
            onClick={handleGoFirstPage}
            className="rounded-full transition-colors duration-150 enabled:hover:bg-gray-100 disabled:opacity-50"
          >
            <Icons.KeyboardDoubleArrowLeft className="h-4 w-4 fill-gray-700" />
          </button>
        </li>

        {/* Prev button */}
        <li id={`navigation__prev-${instanceId.current}`}>
          <button
            disabled={currentPage === 1}
            onClick={handleGoPrevPage}
            className="rounded-full transition-colors duration-150 enabled:hover:bg-gray-100 disabled:opacity-50"
          >
            <Icons.KeyboardArrowLeft className="h-4 w-4 fill-gray-700" />
          </button>
        </li>

        {/* Pagination pages */}
        {pages.map((page, idx) =>
          page === "..." ? (
            <li key={idx} className="text-[13px] font-medium text-navy-500">
              ...
            </li>
          ) : (
            <li key={idx}>
              <button
                onClick={() => handleOnPageChange(page as number)}
                className={cn(
                  "aspect-square rounded-full text-[13px] font-medium text-navy-500 transition-colors duration-150",
                  {
                    "bg-blue-100 font-semibold text-blue-600": currentPage === page,
                    "hover:bg-gray-100": currentPage !== page,
                  },
                )}
              >
                {page}
              </button>
            </li>
          ),
        )}

        {/* Next button */}
        <li id={`navigation__next-${instanceId.current}`}>
          <button
            disabled={currentPage === totalPages}
            onClick={handleGoNextPage}
            className="rounded-full transition-colors duration-150 enabled:hover:bg-gray-100 disabled:opacity-50"
          >
            <Icons.KeyboardArrowRight className="h-4 w-4 fill-gray-700" />
          </button>
        </li>

        {/* Last button */}
        <li id={`navigation__last-${instanceId.current}`}>
          <button
            disabled={currentPage === totalPages}
            onClick={handleGoLastPage}
            className="rounded-full transition-colors duration-150 enabled:hover:bg-gray-100 disabled:opacity-50"
          >
            <Icons.KeyboardDoubleArrowRight className="h-4 w-4 fill-gray-700" />
          </button>
        </li>
      </ul>

      {pagination?.snapOptions && (
        <div className="hidden md:block">
          <SnapSelect />
        </div>
      )}
    </div>
  );
};

const SnapSelect = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const selectedItemsPerPage = scopeStore.use.selectedItemsPerPage();
  const pagination = scopeStore.use.pagination();
  const snapOptions = pagination!.snapOptions!;
  const showSnapOptions = scopeStore.use.showSnapOptions();

  const instanceId = React.useRef(nanoid("alpha"));

  const selectedSnapOption = React.useMemo(() => {
    return snapOptions.find((v) => {
      return _.isEqual(v.itemsPerPage, selectedItemsPerPage);
    });
  }, [selectedItemsPerPage]);

  const { x, y, refs, strategy, context } = useFloating({
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift()],
    open: showSnapOptions,
    onOpenChange: (v) => {
      scopeStore.setState({ showSnapOptions: v });
    },
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context, {
    outsidePress: true,
  });

  const click = useClick(context, {
    enabled: false,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={() => {
          scopeStore.setState({ showSnapOptions: !showSnapOptions });
        }}
        className={cn(
          "h-auto rounded-full border border-gray-400 bg-white px-[12px] py-[4px] transition-colors duration-150 disabled:cursor-not-allowed",
          { "!border-blue-500": showSnapOptions },
        )}
        aria-expanded={showSnapOptions ? "true" : "false"}
        aria-haspopup="true"
        aria-controls={`snap-options-menu-${instanceId.current}`}
        aria-label="Select Snap Option"
      >
        <div className="flex items-center justify-between gap-3">
          <p className={cn("text-[13px] font-medium text-navy-700")}>
            {selectedSnapOption ? selectedSnapOption.label : "Custom"}
          </p>
          <Icons.ChevronDown
            className={cn("h-4 w-4 shrink-0 fill-navy-700 transition-transform duration-150", {
              "rotate-180": showSnapOptions,
            })}
            aria-hidden="true"
          />
        </div>
      </button>

      <AnimatePresence>
        {showSnapOptions && (
          <motion.div
            id={`snap-options-menu-${instanceId.current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            className="z-[10]"
            role="menu"
          >
            <SnapOptions />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SnapOptions = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const pagination = scopeStore.use.pagination();
  const snapOptions = pagination!.snapOptions!;

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

interface SnapOptionItemProps {
  option: TScopeSnapOptionItem;
}

const SnapOptionItem = (props: SnapOptionItemProps) => {
  const { option } = props;

  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const selectedItemsPerPage = scopeStore.use.selectedItemsPerPage();

  const isSelected = React.useMemo(() => {
    return _.isEqual(selectedItemsPerPage, option.itemsPerPage);
  }, [selectedItemsPerPage]);

  const handleClickOption = () => {
    scopeStore.setState({
      selectedItemsPerPage: option.itemsPerPage,
      currentPage: 1,
      showSnapOptions: false,
    });

    if (option.action) {
      option.action();
    }
  };

  return (
    <button
      type="button"
      tabIndex={0}
      aria-label={`Option: ${option.label}`}
      aria-selected={isSelected}
      className={cn(
        "w-full px-[16px] py-[4px] text-left transition-colors duration-150",
        { "enabled:hover:bg-blue-100 enabled:active:bg-blue-200": !isSelected },
        { "bg-blue-100": isSelected },
      )}
      onClick={handleClickOption}
    >
      <p
        className={cn(
          "whitespace-nowrap text-[13px] font-medium text-navy-700 transition-colors duration-150",
          { "text-blue-500": isSelected },
        )}
      >
        {option.label}
      </p>
    </button>
  );
};
