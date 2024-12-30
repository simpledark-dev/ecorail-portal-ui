import { Meta, StoryFn } from "@storybook/react";
import { MetricCard, MetricCardProps } from "..";

export default {
  title: "Components/MetricCard",
  component: MetricCard,
} as Meta;

const Template: StoryFn<MetricCardProps> = (args) => {
  return (
    <div className="w-fit">
      <MetricCard {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Total Trip Duration",
  value: "5 hrs 21 mins",
};

export const WithUnit = Template.bind({});
WithUnit.args = {
  label: <>Overall Compliance</>,
  value: <>34</>,
  unit: "%",
};

export const WithLoading = Template.bind({});
WithLoading.args = {
  label: <>Overall Compliance</>,
  value: <>34</>,
  unit: "%",
  loading: true,
};
