import { StoryFn } from "storybook/internal/types";
import { Icons } from "..";

export default {
  title: "Components/Icons",
};

export const Default: StoryFn = () => {
  return (
    <div className="flex flex-wrap items-center justify-start gap-5">
      <Icons.Info className="h-16 w-16 shrink-0 fill-green-500" />
      <Icons.Info className="h-16 w-16 shrink-0 fill-blue-500" />
      <Icons.Info className="h-16 w-16 shrink-0 fill-red-500" />
      <Icons.Info className="h-16 w-16 shrink-0 fill-orange-500" />

      <Icons.Plus className="fill-navy-500 h-16 w-16 shrink-0" />
      <Icons.Minus className="fill-navy-500 h-16 w-16 shrink-0" />
      <Icons.Focus className="fill-navy-500 h-16 w-16 shrink-0" />
    </div>
  );
};
