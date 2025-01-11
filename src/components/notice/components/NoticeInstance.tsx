/** @jsxImportSource @emotion/react */
import { Icons } from "@/components/icons";
import { TNoticeInstance } from "../types";
import { useScopeContext } from "../contexts/scope.context";
import React from "react";
import { cn } from "@/utils/common.util";
import { Collapse } from "@/elements/collapse";

interface NoticeInstanceProps {
  instance: TNoticeInstance;
}

export const NoticeInstance = (props: NoticeInstanceProps) => {
  const { instance } = props;

  const scopeContext = useScopeContext();
  const remove = scopeContext.store.use.remove();

  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleClose = () => {
    remove(instance.id);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  React.useEffect(() => {
    if (instance.autoClose) {
      setTimeout(handleClose, instance.autoClose.timeout);
    }
  }, [instance.autoClose]);

  return (
    <div
      role="dialog"
      aria-labelledby={`dialog-title-${instance.id}`}
      aria-describedby={`dialog-body-${instance.id}`}
      aria-modal="true"
    >
      <div
        className={cn(
          "min-w-[320px] max-w-[480px] overflow-hidden rounded-[8px] border border-gray-400 bg-white drop-shadow-lg transition-all duration-150 sm:min-w-[380px]",
        )}
      >
        {/* Notice Heading */}
        <div
          className={cn(
            "flex items-center justify-between gap-3 border-b bg-white p-[16px]",

            { "border-gray-400": instance.body && !isCollapsed },
            { "border-transparent": isCollapsed },
          )}
        >
          <div className="flex items-center justify-start gap-3">
            {instance.icon && instance.icon}
            <h3
              id={`dialog-title-${instance.id}`}
              className="m-0 p-0 text-base font-semibold text-navy-700"
            >
              {instance.title}
            </h3>
          </div>

          {!instance.closeable && instance.collapsible && (
            <button
              aria-label="Collapse"
              type="button"
              className="group rounded-full bg-gray-100 p-2 transition-colors duration-150 hover:bg-blue-100 active:bg-blue-200"
              onClick={handleToggleCollapse}
            >
              <Icons.ChevronDown
                aria-hidden="true"
                className="h-5 w-5 shrink-0 fill-navy-600 transition-colors duration-150 active:fill-blue-700 group-hover:fill-blue-600"
              />
            </button>
          )}

          {instance.closeable && (
            <button
              aria-label="Close"
              type="button"
              className="group rounded-full bg-gray-100 p-2 transition-colors duration-150 hover:bg-red-100 active:bg-red-200"
              onClick={handleClose}
            >
              <Icons.Close
                aria-hidden="true"
                className="h-5 w-5 shrink-0 fill-navy-600 transition-colors duration-150 active:fill-red-700 group-hover:fill-red-600"
              />
            </button>
          )}
        </div>

        {instance.body && (
          <Collapse isOpen={!isCollapsed}>
            <div className="space-y-[16px] bg-gray-50 p-[20px]">
              {/* Notice Body */}
              <div id={`notice-body-${instance.id}`}>{instance.body && instance.body}</div>

              {/* Notice Actions */}
              {instance.actions && (
                <div className="flex items-center justify-center">{instance.actions(instance)}</div>
              )}
            </div>
          </Collapse>
        )}
      </div>
    </div>
  );
};
