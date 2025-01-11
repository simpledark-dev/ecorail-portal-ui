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
      <Icons.Close className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.CalendarToday className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.History className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.Person className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.Train className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.Filter className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.PieChart className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.LaptopMac className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.Route className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.Direction className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.SwapVert className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.Sort className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.SortUp className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.SortDown className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.KeyboardArrowLeft className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.KeyboardArrowRight className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.KeyboardDoubleArrowLeft className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.KeyboardDoubleArrowRight className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.FixedSuccess className="h-16 w-16 shrink-0" />
      <Icons.FixedWarning className="h-16 w-16 shrink-0" />
      <Icons.FixedError className="h-16 w-16 shrink-0" />
      <Icons.Setting className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.PermContact className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.CalendarClock className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.Map className="h-16 w-16 shrink-0 fill-navy-500" />
      <Icons.ArrowDropdown className="h-16 w-16 shrink-0 fill-navy-500" />
    </div>
  );
};
