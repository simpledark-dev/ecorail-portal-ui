import { Meta, StoryFn } from "@storybook/react";
import { Icons } from "..";

export default {
  title: "Components/Icons",
} as Meta;

export const Default: StoryFn = () => {
  return (
    <div className="flex flex-wrap items-center justify-start gap-5">
      <Icons.Info className="h-16 w-16 shrink-0 fill-green-500" />
      <Icons.Info className="h-16 w-16 shrink-0 fill-blue-500" />
      <Icons.Info className="h-16 w-16 shrink-0 fill-red-500" />
      <Icons.Info className="h-16 w-16 shrink-0 fill-orange-500" />

      <Icons.Plus className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.Minus className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.Focus className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.TopRightArrow className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.ChevronRight className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.Logout className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.AdminPanel className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.LiveTV className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.BarChart className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.ListAlt className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.Speed className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.ChevronLeft className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.CenterFocus className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.Search className="h-16 w-16 shrink-0 fill-navy-500" />
    </div>
  );
};
