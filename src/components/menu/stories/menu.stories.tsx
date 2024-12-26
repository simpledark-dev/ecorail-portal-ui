import { Icons } from "@/components/icons";
import { StoryFn } from "@storybook/react";
import { Menu } from "..";

export default {
  title: "Components/Menu",
};

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
