import { ToggleButton } from "@/components/toggle-button";
import React from "react";
import { LocoSignalStatus } from "../enums";
import { locoSignalStatusMapping } from "../mappings";
import { cn } from "@/utils/common.util";
import { useScopeContext } from "../contexts/scope.context";

export const SignalsFilter = React.memo(() => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const showLiveSignal = scopeStore.use.showLiveSignal();
  const showRecentlySignal = scopeStore.use.showRecentlySignal();
  const showLostSignal = scopeStore.use.showLostSignal();

  const signals = [
    {
      key: LocoSignalStatus.LIVE_SIGNAL,
      checked: showLiveSignal,
      toggle: () => {
        scopeStore.setState({ showLiveSignal: !showLiveSignal });
      },
    },
    {
      key: LocoSignalStatus.RECENTLY_SIGNAL,
      checked: showRecentlySignal,
      toggle: () => {
        scopeStore.setState({ showRecentlySignal: !showRecentlySignal });
      },
    },
    {
      key: LocoSignalStatus.LOST_SIGNAL,
      checked: showLostSignal,
      toggle: () => {
        scopeStore.setState({ showLostSignal: !showLostSignal });
      },
    },
  ];

  return (
    <div className="overflow-hidden rounded-[8px] border border-gray-400 bg-white drop-shadow-sm">
      <div className="px-3 py-2">
        <p className="text-sm font-semibold text-navy-700">Signals</p>
      </div>
      <div className="h-[1px] w-full bg-gray-400" />
      <div className="space-y-2 whitespace-nowrap p-3 text-xs">
        {signals.map((signal, index) => (
          <div key={index} className="flex items-center justify-between gap-8">
            <div className="flex items-center justify-start gap-2">
              <div
                className={cn(
                  "h-6 w-6 rounded-full border-[3px] border-white bg-gradient-to-b drop-shadow-sm",
                  locoSignalStatusMapping[signal.key].themeClass,
                )}
              />
              <div>
                <p className="font-semibold text-neutral-400">
                  {locoSignalStatusMapping[signal.key].label}
                </p>
                <p className="text-neutral-300">
                  {locoSignalStatusMapping[signal.key].description}
                </p>
              </div>
            </div>
            <ToggleButton
              size={"sm"}
              checked={signal.checked}
              onChange={signal.toggle}
              aria-label={`Toggle ${locoSignalStatusMapping[signal.key].label}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
SignalsFilter.displayName = "UI.SignalsFilter";
