import { Meta, StoryFn } from "@storybook/react";
import { Breadcrumb } from "..";

export default {
  title: "Layout/Breadcrumb",
  component: Breadcrumb,
} as Meta;

export const Default: StoryFn = () => {
  const items = [
    { label: "Via Rail", href: "/" },
    { label: "Trip Review", href: "/" },
  ];

  return (
    <div className="bg-navy-700 p-12">
      <Breadcrumb items={items} />
    </div>
  );
};
