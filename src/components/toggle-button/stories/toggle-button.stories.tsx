import { Meta, StoryFn } from "@storybook/react";
import { ToggleButton } from "..";

export default {
  title: "Components/ToggleButton",
} as Meta;

export const Default: StoryFn = () => {
  return <ToggleButton />;
};
