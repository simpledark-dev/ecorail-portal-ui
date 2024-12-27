import React from "react";

export interface HeaderWidgetProps {
  title: string | React.ReactElement;
  subtitle: string | React.ReactElement;
}

export const HeaderWidget = (props: HeaderWidgetProps) => {
  const { title, subtitle } = props;

  return (
    <div className="border-b border-gray-400 px-8 py-4">
      <h1 className="mb-1 whitespace-nowrap text-2xl font-semibold text-navy-700">{title}</h1>
      <p className="whitespace-nowrap text-sm text-navy-500">{subtitle}</p>
    </div>
  );
};
