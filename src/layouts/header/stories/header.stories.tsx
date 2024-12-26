import { StoryFn } from "@storybook/react";
import { Header } from "..";

export default {
  title: "Layout/Header",
};

export const Default: StoryFn = () => {
  return (
    <>
      <Header />
    </>
  );
};
