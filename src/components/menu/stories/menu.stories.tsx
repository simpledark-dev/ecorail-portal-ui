import { Icons } from "@/components/icons";
import { Meta, StoryFn } from "@storybook/react";
import { Menu } from "..";

export default {
  title: "Components/Menu",
  component: Menu,
} as Meta;

export const Default: StoryFn = () => {
  const menuItems = [
    {
      icon: <Icons.AdminPanel className="h-5 w-5 fill-current" />,
      label: "Admin",
      action: () => {},
    },
    {
      icon: <Icons.Logout className="h-5 w-5 fill-current" />,
      label: "Logout",
      action: () => {},
    },
  ];

  return (
    <>
      <Menu items={menuItems} />
    </>
  );
};
