import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonProps } from "..";
export default {
  title: "Components/Button",
  component: Button,
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => {
  return <Button {...args}>Button</Button>;
};

export const Default = Template.bind({});
Default.args = {};

export const Disable = Template.bind({});
Disable.args = { disabled: true };

export const Brand = Template.bind({});
Brand.args = { variant: "brand" };

export const Navy = Template.bind({});
Navy.args = { variant: "navy" };

export const NavyDark = Template.bind({});
NavyDark.args = { variant: "navy-dark" };

export const Neutral = Template.bind({});
Neutral.args = { variant: "neutral" };

export const NeutralLight = Template.bind({});
NeutralLight.args = { variant: "neutral-light" };

export const Gray = Template.bind({});
Gray.args = { variant: "gray" };

export const GrayLight = Template.bind({});
GrayLight.args = { variant: "gray-light" };

export const Blue = Template.bind({});
Blue.args = { variant: "blue" };

export const Red = Template.bind({});
Red.args = { variant: "red" };

export const Green = Template.bind({});
Green.args = { variant: "green" };

export const Orange = Template.bind({});
Orange.args = { variant: "orange" };
