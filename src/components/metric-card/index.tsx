import { cn, nanoid } from "@/utils/common.util";
import { Spinner } from "../spinner";
import React from "react";

export interface MetricCardProps {
  label: string | React.ReactElement;
  value: string | number | React.ReactElement;
  unit?: string | React.ReactElement;
  loading?: boolean;
}

export const MetricCard = (props: MetricCardProps) => {
  const { label, value, unit, loading } = props;

  const instanceId = React.useRef(nanoid("alpha"));

  return (
    <div
      className={cn("flex w-full items-center justify-start gap-8 bg-white px-[24px] py-[20px]")}
    >
      <div>
        <h2 className="mb-2 text-sm font-medium text-neutral-400">{label}</h2>
        <div className="relative">
          <div
            key={instanceId.current}
            className={cn(
              "absolute inset-0 mx-2 flex items-center justify-start transition-all duration-100",
              { "opacity-0": !loading },
            )}
          >
            <Spinner size={32} stroke={2.5} />
          </div>
          <div
            className={cn("flex items-center justify-start gap-3 transition-all duration-150", {
              "opacity-0": loading,
            })}
          >
            <p className="text-3xl font-semibold text-navy-700">{loading ? "--" : value}</p>
            {unit && <p className="text-sm font-medium text-navy-500">{unit}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
