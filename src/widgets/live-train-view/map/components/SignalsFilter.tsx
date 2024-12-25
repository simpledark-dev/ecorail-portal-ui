import { ToggleButton } from "@/components/toggle-button";
import React from "react";
import { LocoSignalStatus, ScopeEventName } from "../enums";
import { locoSignalStatusMapping } from "../mappings";
import { cn } from "@/utils/common.util";
import { useScopeContext } from "../contexts/scope.context";
import { classifyLocoSignalStatus } from "../utils";

export const SignalsFilter = React.memo(() => {
  const scopeContext = useScopeContext();
  const scopeEventBus = scopeContext.eventBus;
  const scopeStore = scopeContext.store;
  const locos = scopeStore.use.locos();
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

  React.useEffect(() => {
    const filteredLocos = locos.filter((loco) => {
      const signalStatus = classifyLocoSignalStatus(loco.lastSeenUtc);

      if (signalStatus === LocoSignalStatus.LIVE_SIGNAL && showLiveSignal) {
        return true;
      }
      if (signalStatus === LocoSignalStatus.RECENTLY_SIGNAL && showRecentlySignal) {
        return true;
      }
      if (signalStatus === LocoSignalStatus.LOST_SIGNAL && showLostSignal) {
        return true;
      }

      return false;
    });

    scopeStore.setState({ displayLocos: filteredLocos });
  }, [showLiveSignal, showRecentlySignal, showLostSignal]);

  return (
    <div className="overflow-hidden rounded-[8px] border border-gray-400 bg-white drop-shadow-sm">
      <div className="px-3 py-2">
        <p className="text-navy-700 text-sm font-semibold">Signals</p>
      </div>
      <div className="h-[1px] w-full bg-gray-400" />
      <div className="space-y-2 whitespace-nowrap p-3 text-xs">
        {signals.map((signal, index) => (
          <div key={index} className="flex items-center justify-between gap-6">
            <div className="flex items-center justify-start gap-2">
              <div
                className={cn(
                  "h-6 w-6 rounded-full border-[3px] border-white bg-gradient-to-b drop-shadow-sm",
                  locoSignalStatusMapping[signal.key].themeClass,
                )}
              />
              <div>
                <p className="text-navy-700 font-medium">
                  {locoSignalStatusMapping[signal.key].label}
                </p>
                <p className="text-neutral-500">
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
