import { Meta, StoryFn } from "@storybook/react";
import { Spinner, SpinnerProps } from "..";

export default {
  title: "Components/Spinner",
  component: Spinner,
} as Meta;

export const Default: StoryFn<SpinnerProps> = () => {
  return (
    <div className="flex flex-wrap items-center justify-start gap-5">
      <Spinner />
      <Spinner size={48} stroke={3} speed={0.4} />
      <Spinner size={32} stroke={2} color="#1A9E6B" speed={0.3} />
    </div>
  );
};
