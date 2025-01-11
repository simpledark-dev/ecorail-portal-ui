import { Icons } from "@/components/icons";
import React from "react";

export interface HeaderWidgetProps {
  title: string | React.ReactElement;
  subtitle: string | React.ReactElement;
  status?: "warning" | "success" | "in-process";
}

export const HeaderWidget = (props: HeaderWidgetProps) => {
  const { title, subtitle, status } = props;

  const renderStatusIcon = () => {
    switch (status) {
      case "warning":
        return <Icons.Info className="h-9 w-9 fill-orange-500" />;
      case "success":
        return <Icons.Info className="h-9 w-9 fill-green-500" />;
      case "in-process":
        return <Icons.Info className="h-9 w-9 fill-blue-500" />;
      default:
        return <></>;
    }
  };

  return (
    <div className="border-b border-gray-400 px-[32px] py-[24px]">
      <div className="mb-1 flex items-center justify-start gap-3">
        <div className="shrink-0">{renderStatusIcon()}</div>
        <h1 className="whitespace-nowrap text-2xl font-semibold text-navy-700">{title}</h1>
      </div>
      <p className="whitespace-nowrap text-sm text-navy-500">{subtitle}</p>
    </div>
  );
};
