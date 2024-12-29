import { Meta, StoryFn } from "@storybook/react";
import { SingleSelect } from "..";
import { nanoid } from "@/utils/common.util";
import { Icons } from "@/components/icons";

export default {
  title: "Components/SingleSelect",
  component: SingleSelect,
  argTypes: {
    onSelectedValueChange: {
      action: "onSelectedValueChange",
      description: "Callback when the selected value change",
    },
  },
} as Meta;

export const Default: StoryFn = (args) => {
  return (
    <>
      <SingleSelect
        title="Focus Locomotive"
        icon={<Icons.CenterFocus className="h-5 w-5" />}
        options={[
          { id: nanoid(), label: "All Locomotives", value: null },
          { id: nanoid(), label: "VIA 900", value: "via-900" },
          { id: nanoid(), label: "VIA 6424", value: "via-6424" },
          { id: nanoid(), label: "VIA 2202", value: "via-2202" },
          { id: nanoid(), label: "VIA 2215", value: "via-2215", disable: true },
        ]}
        {...args}
      />
    </>
  );
};

export const EmptyData: StoryFn = () => {
  return (
    <>
      <SingleSelect
        title="No Data Available"
        icon={<Icons.CenterFocus className="h-5 w-5" />}
        options={[]}
      />
    </>
  );
};

export const Disable: StoryFn = () => {
  return (
    <>
      <SingleSelect
        title="Disable"
        disable={true}
        icon={<Icons.CenterFocus className="h-5 w-5" />}
        options={[]}
      />
    </>
  );
};
