/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/utils/common.util";

export interface SpinnerProps extends React.ComponentPropsWithoutRef<"div"> {
  size?: number;
  color?: string;
  stroke?: number;
  speed?: number;
}

export const Spinner = React.memo((props: SpinnerProps) => {
  const { size = 64, color = "#535C8D", stroke = 4, speed = 0.5, className } = props;

  const instanceId = React.useMemo(() => uuidv4(), []);
  const fxRotateId = React.useMemo(() => `fx-rotate-${instanceId}`, [instanceId]);

  return (
    <div className={cn("justify-content-center flex select-none", className)}>
      <div
        css={css`
          width: ${size}px;
          height: ${size}px;
          user-select: none;
        `}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute left-1/2 top-1/2">
            <div
              className={cn("absolute left-1/2 top-1/2 rounded-full opacity-10")}
              css={css`
                width: ${size}px;
                height: ${size}px;
                margin-top: ${-size / 2}px;
                margin-left: ${-size / 2}px;
                transform-origin: ${size / 2}px ${size / 2}px;
                box-shadow: inset 0 0 0 ${stroke}px ${color};
              `}
            />
            <div
              className="absolute left-1/2 top-1/2"
              css={css`
                @keyframes ${fxRotateId} {
                  100% {
                    transform: rotate(360deg);
                  }
                }

                width: ${size / 2}px;
                height: ${size}px;
                margin-top: ${-size / 2}px;
                margin-left: ${-size / 2}px;
                mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
                transform-origin: ${size / 2}px ${size / 2}px;
                animation: ${fxRotateId} ${speed}s infinite linear;
              `}
            >
              <div
                className={cn("absolute left-0 top-0 rounded-full opacity-80")}
                css={css`
                  width: ${size}px;
                  height: ${size}px;
                  box-shadow: inset 0 0 0 ${stroke}px ${color};
                `}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Spinner.displayName = "UI.Spinner";
