import { Meta, StoryFn } from "@storybook/react";
import { ProgressBar } from "..";

export default {
  title: "Components/ProgressBar",
} as Meta;

export const Default: StoryFn = () => {
  return <ProgressBar progress={0.5} height={12} className="overflow-hidden rounded-full" />;
};

export const WithBreakpoints: StoryFn = () => {
  const breakpoints = [
    {
      color: "#D97373",
      condition(value: number) {
        return value >= 0 && value <= 0.3;
      },
    },
    {
      color: "#FC8B22",
      condition(value: number) {
        return value > 0.3 && value <= 0.5;
      },
    },
    {
      color: "#507CCF",
      condition(value: number) {
        return value > 0.5 && value <= 0.8;
      },
    },
    {
      color: "#1A9E6B",
      condition(value: number) {
        return value > 0.8 && value <= 1;
      },
    },
  ];

  return (
    <div className="space-y-2">
      <ProgressBar
        progress={0.2}
        height={12}
        breakpoints={breakpoints}
        className="overflow-hidden rounded-full"
      />

      <ProgressBar
        progress={0.5}
        height={12}
        breakpoints={breakpoints}
        className="overflow-hidden rounded-full"
      />

      <ProgressBar
        progress={0.7}
        height={12}
        breakpoints={breakpoints}
        className="overflow-hidden rounded-full"
      />

      <ProgressBar
        progress={0.9}
        height={12}
        breakpoints={breakpoints}
        className="overflow-hidden rounded-full"
      />
    </div>
  );
};
