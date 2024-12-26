import { StoryFn } from "storybook/internal/types";
import { Breadcrumb } from "..";

export default {
  title: "Layout/Breadcrumb",
};

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
