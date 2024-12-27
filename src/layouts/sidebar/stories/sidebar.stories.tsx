import { Icons } from "@/components/icons";
import { Sidebar } from "..";
import { StoryFn, Meta } from "@storybook/react";
import { nanoid } from "@/utils/common.util";

export default {
  title: "Layout/Sidebar",
  component: Sidebar,
} as Meta;

export const Default: StoryFn = () => {
  return (
    <>
      <Sidebar
        show={true}
        company={{
          logo: (
            <img className="h-8 w-auto object-contain object-center" src="/images/via-logo.png" />
          ),
          logoSmall: (
            <img className="h-8 w-auto object-contain object-center" src="/images/via-logo.png" />
          ),
        }}
        navItems={[
          { id: nanoid(), icon: Icons.LiveTV, label: "Live Train View", href: "/live-train" },
          {
            id: nanoid(),
            icon: Icons.BarChart,
            label: "Trending Metrics",
            href: "/trending-metric",
          },
          { id: nanoid(), icon: Icons.ListAlt, label: "Trip Review", href: "/trip-review" },
          { id: nanoid(), icon: Icons.Speed, label: "Speed Limits", href: "/speed-limit" },
        ]}
      />
    </>
  );
};
