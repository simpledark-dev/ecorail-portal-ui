/** @jsxImportSource @emotion/react */
import { TDialogInstance } from "../types";
import { css } from "@emotion/react";

interface DialogInstanceProps {
  instance: TDialogInstance;
}

export const DialogInstance = (props: DialogInstanceProps) => {
  const { instance } = props;

  return (
    <div
      role="dialog"
      aria-labelledby={`dialog-title-${instance.id}`}
      aria-describedby={`dialog-body-${instance.id}`}
      aria-modal="true"
      className="z-2 absolute left-[50%] top-[40%] mx-auto flex h-auto w-full items-center justify-center px-[32px]"
      css={css`
        transform: translateX(-50%) translateY(-50%);
      `}
    >
      <div className="min-w-[360px] max-w-[540px] overflow-hidden rounded-[8px] border border-gray-400 bg-white drop-shadow-sm sm:min-w-[420px]">
        {/* Dialog Heading */}
        <div className="flex items-center justify-start gap-3 border-b border-gray-400 bg-white p-[20px]">
          {instance.icon && instance.icon}
          <h3
            id={`dialog-title-${instance.id}`}
            className="m-0 p-0 text-base font-semibold text-navy-700"
          >
            {instance.title}
          </h3>
        </div>

        <div className="space-y-[16px] bg-gray-50 p-[20px]">
          {/* Dialog Body */}
          <div id={`dialog-body-${instance.id}`}>{instance.body && instance.body}</div>

          {/* Dialog Actions */}
          {instance.actions && (
            <div className="flex items-center justify-center">{instance.actions(instance)}</div>
          )}
        </div>
      </div>
    </div>
  );
};
