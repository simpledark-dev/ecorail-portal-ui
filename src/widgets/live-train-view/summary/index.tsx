/** @jsxImportSource @emotion/react */
import { MetricCard } from "@/components/metric-card";
import { cn } from "@/utils/common.util";

export interface SummaryWidgetProps {
  totalLiveSignals: number;
  totalRecentlySignals: number;
  totalLostSignals: number;
  loading?: boolean;
}

const signalData = [
  {
    label: "Live Signal",
    value: (props: SummaryWidgetProps) => props.totalLiveSignals,
    background: "bg-gradient-to-b from-blue-500 to-blue-300",
  },
  {
    label: "Recently Seen",
    value: (props: SummaryWidgetProps) => props.totalRecentlySignals,
    background: "bg-gradient-to-b from-orange-500 to-orange-300",
  },
  {
    label: "Lost Signal",
    value: (props: SummaryWidgetProps) => props.totalLostSignals,
    background: "bg-gradient-to-b from-gray-500 to-gray-300",
  },
];

export const SummaryWidget = (props: SummaryWidgetProps) => {
  const { loading } = props;

  return (
    <ul className="grid w-full grid-cols-1 justify-between overflow-hidden rounded-[12px] border border-gray-400 bg-white drop-shadow-sm lg:grid-cols-3">
      {signalData.map((signal, idx, arr) => (
        <li
          key={idx}
          className={cn("flex grow items-center justify-start gap-2 bg-white px-[24px]", {
            "border-b border-r-0 border-gray-400 lg:border-b-0 lg:border-r": idx < arr.length - 1,
          })}
        >
          <div className="h-full py-[20px]">
            <div className={`h-full w-[5px] shrink-0 rounded-full ${signal.background}`} />
          </div>
          <MetricCard label={signal.label} value={signal.value(props)} loading={loading} />
        </li>
      ))}
    </ul>
  );
};
