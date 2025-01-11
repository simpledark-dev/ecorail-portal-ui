import { Meta, StoryFn } from "@storybook/react";
import { HeaderWidget, HeaderWidgetProps } from "..";
import moment from "moment";

export default {
  title: "Widgets/DetailsTripReview/Header",
  component: HeaderWidget,
} as Meta;

const Template: StoryFn<HeaderWidgetProps> = (args) => {
  return <HeaderWidget {...args} />;
};

export const Warning = Template.bind({});
Warning.args = {
  title: "Details Trip Review",
  subtitle: (
    <>
      Data updated for <strong>{moment().format("LLL")}</strong>
    </>
  ),
  status: "warning",
};

export const Success = Template.bind({});
Success.args = {
  title: "Details Trip Review",
  subtitle: (
    <>
      Data updated for <strong>{moment().format("LLL")}</strong>
    </>
  ),
  status: "success",
};

export const InProgress = Template.bind({});
InProgress.args = {
  title: "Details Trip Review",
  subtitle: (
    <>
      Data updated for <strong>{moment().format("LLL")}</strong>
    </>
  ),
  status: "in-process",
};
