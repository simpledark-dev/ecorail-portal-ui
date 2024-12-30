import { Meta, StoryFn } from "@storybook/react";
import { SummaryWidget, SummaryWidgetProps } from "..";
export default {
  title: "Widgets/LiveTrainView/Summary",
  component: SummaryWidget,
} as Meta;

const Template: StoryFn<SummaryWidgetProps> = (args) => {
  return <SummaryWidget {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  totalLiveSignals: 5,
  totalRecentlySignals: 2,
  totalLostSignals: 1,
};

export const WithLoading = Template.bind({});
WithLoading.args = {
  totalLiveSignals: 5,
  totalRecentlySignals: 2,
  totalLostSignals: 1,
  loading: true,
};
