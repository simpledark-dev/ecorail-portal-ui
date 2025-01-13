import { Meta, StoryFn } from "@storybook/react";
import { ToggleButton } from "..";

export default {
  title: "Components/ToggleButton",
} as Meta;

export const Default: StoryFn = () => {
  return <ToggleButton />;
};

export const Small: StoryFn = () => {
  return <ToggleButton size="sm" />;
};

export const Medium: StoryFn = () => {
  return <ToggleButton size="md" />;
};

export const Disabled: StoryFn = () => {
  return <ToggleButton disabled />;
};
