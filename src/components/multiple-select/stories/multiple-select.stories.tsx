import { Icons } from "@/components/icons";
import { MultipleSelect, MultipleSelectProps } from "..";
import { StoryFn, Meta } from "@storybook/react";
import { nanoid } from "@/utils/common.util";

export default {
  title: "Components/MultipleSelect",
  component: MultipleSelect,
  argTypes: {
    onSelectedValuesChange: {
      action: "onSelectedValuesChange",
      description: "Callback when the selected values change",
    },
  },
} as Meta;

const Template: StoryFn<MultipleSelectProps> = (args) => {
  return <MultipleSelect {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: "Multiple Select",
  icon: <Icons.PageInfo className="h-5 w-5" />,
  options: [
    {
      id: nanoid(),
      label: "Option 1",
      value: "option-1",
    },
    {
      id: nanoid(),
      label: "Option 2",
      value: "option-2",
    },
  ],
};

export const WithScroll = Template.bind({});
WithScroll.args = {
  ...Default.args,
  options: Array.from({ length: 10 }, (_, index) => ({
    id: nanoid(),
    label: `Option ${index + 1}`,
    value: `option-${index + 1}`,
  })),
};

export const EmptyData = Template.bind({});
EmptyData.args = {
  ...Default.args,
  options: [],
};

export const Disable = Template.bind({});
Disable.args = {
  ...Default.args,
  disable: true,
};
