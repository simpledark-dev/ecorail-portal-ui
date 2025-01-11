/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion } from "framer-motion";

type TScopeBreakpoint = {
  color: string;
  condition: (value: number) => boolean;
};

export interface ProgressBarProps extends React.ComponentPropsWithoutRef<"div"> {
  progress?: number;
  height?: number;
  bgColor?: string;
  fillColor?: string;
  breakpoints?: TScopeBreakpoint[];
}

export const ProgressBar = (props: ProgressBarProps) => {
  const {
    progress = 0.5,
    height = 4,
    bgColor = "#F1F2F3",
    fillColor = "#C5C8CE",
    breakpoints = [],
    ...rest
  } = props;

  const currentColor =
    breakpoints.length > 0
      ? breakpoints.reduce((acc, { color, condition }) => {
          return condition(progress) ? color : acc;
        }, bgColor)
      : fillColor;

  return (
    <div
      css={css`
        width: 100%;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          border: 0;
          background-color: ${bgColor};
        }
      `}
      {...rest}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: Math.min(1, Math.max(0, progress)) }}
        transition={{ duration: 0.2, delay: 0.2 }}
        css={css`
          width: 100%;
          height: ${height}px;
          background-color: ${currentColor};
          transform-origin: left;
        `}
      />
    </div>
  );
};
