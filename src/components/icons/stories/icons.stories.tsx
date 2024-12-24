import { StoryFn } from "storybook/internal/types";
import { Icons } from "..";

export default {
  title: "Components/Icons",
};

export const Default: StoryFn = () => {
  return (
    <div className="flex flex-wrap items-center justify-start gap-5">
      <Icons.Info className="h-16 w-16 shrink-0 fill-[#1A9E6B]" />
      <Icons.Info className="h-16 w-16 shrink-0 fill-[#507CCF]" />
      <Icons.Info className="h-16 w-16 shrink-0 fill-[#CF5050]" />
      <Icons.Info className="h-16 w-16 shrink-0 fill-[#E26F03]" />
    </div>
  );
};
