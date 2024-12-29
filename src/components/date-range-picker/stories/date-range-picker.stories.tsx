import { Meta, StoryFn } from "@storybook/react";
import { DateRangePicker, DateRangePickerProps } from "..";
import { nanoid } from "@/utils/common.util";

export default {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
} as Meta;

const Template: StoryFn<DateRangePickerProps> = (args) => {
  return (
    <DateRangePicker
      {...args}
      title="Timeframe"
      snapOptions={[
        { id: nanoid(), label: "Last 30 days", rangeDaysFromNow: 30 },
        { id: nanoid(), label: "Last 60 days", rangeDaysFromNow: 60 },
        { id: nanoid(), label: "Last 90 days", rangeDaysFromNow: 90 },
        { id: nanoid(), label: "Last 120 days", rangeDaysFromNow: 120 },
      ]}
      maxRange={365}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Disable = Template.bind({});
Disable.args = { disable: true };
