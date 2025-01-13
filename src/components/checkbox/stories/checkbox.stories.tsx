import React from "react";
import { Checkbox } from "..";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} as Meta;

export const Default: StoryFn = () => {
  return <Checkbox checked={false} onChange={() => {}} />;
};

export const Checked: StoryFn = () => {
  return <Checkbox checked={true} onChange={() => {}} />;
};

export const WithControlable: StoryFn = () => {
  const [checked, setChecked] = React.useState(false);

  return <Checkbox checked={checked} onChange={setChecked} />;
};

export const Small: StoryFn = () => {
  return <Checkbox size="sm" />;
};

export const Medium: StoryFn = () => {
  return <Checkbox size="md" />;
};

export const Disabled: StoryFn = () => {
  return <Checkbox disabled />;
};
