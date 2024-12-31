import { Meta, StoryFn } from "@storybook/react";
import { HeaderWidget, HeaderWidgetProps } from "..";
import moment from "moment";

export default {
  title: "Widgets/TrendingMetrics/Header",
  component: HeaderWidget,
} as Meta;

const Template: StoryFn<HeaderWidgetProps> = (args) => {
  return <HeaderWidget {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: "Trending Metrics",
  subtitle: (
    <>
      Data updated for <strong>{moment().format("LLL")}</strong>
    </>
  ),
};
