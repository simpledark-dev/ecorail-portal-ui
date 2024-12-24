import { StoryFn } from "storybook/internal/types";
import { ToggleButton } from "..";

export default {
  title: "Components/ToggleButton",
};

export const Default: StoryFn = () => {
  return <ToggleButton />;
};
