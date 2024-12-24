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
      className="z-2 absolute left-[50%] top-[40%] h-auto w-auto"
      css={css`
        transform: translateX(-50%) translateY(-50%);
      `}
    >
      <div className="min-w-[350px] max-w-[500px] overflow-hidden rounded-[8px] border border-[#D5D8DE] bg-white drop-shadow-[0_4px_8px_#E5E5E526]">
        {/* Dialog Heading */}
        <div className="flex items-center justify-start gap-3 border-b border-[#D5D8DE] bg-white p-[20px]">
          {instance.icon && instance.icon}
          <h3
            id={`dialog-title-${instance.id}`}
            className="m-0 p-0 text-lg font-semibold text-[#3C4B65]"
          >
            {instance.title}
          </h3>
        </div>

        <div className="space-y-[16px] bg-[#F7F8FA] p-[20px]">
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
