/** @jsxImportSource @emotion/react */
import { cn } from "@/utils/common.util";

export interface SummaryWidgetProps {
  totalLiveSignals: number;
  totalRecentlySignals: number;
  totalLostSignals: number;
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
  return (
    <ul className="grid w-full grid-cols-1 justify-between overflow-hidden rounded-[12px] border border-gray-400 bg-white drop-shadow-sm lg:grid-cols-3">
      {signalData.map((signal, idx, arr) => (
        <li
          key={idx}
          className={cn("flex grow items-center justify-start gap-8 bg-white px-[24px] py-[20px]", {
            "border-b border-r-0 border-gray-400 lg:border-b-0 lg:border-r": idx < arr.length - 1,
          })}
        >
          <div className={`h-full w-[5px] shrink-0 rounded-full ${signal.background}`} />
          <div>
            <h2 className="mb-2 text-sm font-medium text-navy-500">{signal.label}</h2>
            <p className="text-3xl font-semibold text-navy-700">{signal.value(props)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
