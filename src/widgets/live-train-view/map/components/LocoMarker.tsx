/** @jsxImportSource @emotion/react */
import React from "react";
import { TLocoData } from "../types";
import { JSXMarker } from "@/core/jsx-marker";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { cn, nanoid } from "@/utils/common.util";
import { useScopeContext } from "../contexts/scope.context";
import { classifyLocoSignalStatus } from "../utils";
import { locoSignalStatusMapping } from "../mappings";
import { useMap } from "react-leaflet";
import { useMarkerZIndex } from "@/hooks/useMarkerZIndex";
import { LocoMarkerConfig } from "../configs/index";
import { LocoSignalStatus } from "../enums";

interface LocoMarkerProps {
  loco: TLocoData;
  onMap?: boolean;
}

export const LocoMarker = React.memo((props: LocoMarkerProps) => {
  const { loco, onMap = true } = props;

  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const showInfoTooltipLocoMarkerInstanceId = scopeStore.use.showInfoTooltipLocoMarkerInstanceId();

  const instanceId = React.useRef<string>(nanoid("alpha"));
  const wrapperMarkerRef = React.useRef<L.Marker>(null);
  const markerRef = React.useRef<HTMLDivElement>(null);

  const locoSignalStatus = React.useMemo(() => {
    return classifyLocoSignalStatus(loco.lastSeenUtc);
  }, [loco.lastSeenUtc]);

  const isShowInfoTooltip = React.useMemo(() => {
    return showInfoTooltipLocoMarkerInstanceId === instanceId.current;
  }, [showInfoTooltipLocoMarkerInstanceId]);

  const map = useMap();
  useMarkerZIndex(
    {
      map: map,
      markerRef: markerRef,
      zIndex: isShowInfoTooltip
        ? LocoMarkerConfig.MARKER_ZINDEX_ON_SHOW_INFO_TOOLTIP
        : locoSignalStatusMapping[locoSignalStatus].markerZindexBase,
    },
    [isShowInfoTooltip],
  );

  const handleToggleTooltip = React.useCallback(() => {
    scopeStore.setState({
      showInfoTooltipLocoMarkerInstanceId: isShowInfoTooltip ? null : instanceId.current,
    });

    if (!isShowInfoTooltip && onMap) {
      scopeStore.setState({
        showChildrenTooltipLocoClusterInstanceId: null,
      });
    }

    return () => {
      if (isShowInfoTooltip) {
        scopeStore.setState({
          showInfoTooltipLocoMarkerInstanceId: null,
        });
      }
    };
  }, [isShowInfoTooltip]);

  const markerContent = (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      ref={markerRef}
      transition={{ type: "spring" }}
      className="relative h-full w-full"
    >
      {/* Tooltip */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-[100%]">
        <LocoIdTooltip loco={loco} />
      </div>

      {/* Circle */}
      <div
        className={cn(
          "relative z-[5] h-full w-full rounded-full border-[4px] border-white bg-gradient-to-b drop-shadow-sm",
          locoSignalStatusMapping[locoSignalStatus].themeClass,
        )}
        onClick={handleToggleTooltip}
      />

      {/* Tooltip */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 translate-y-[100%]">
        <AnimatePresence mode="popLayout">
          {isShowInfoTooltip && <LocoInfoTooltip loco={loco} signalStatus={locoSignalStatus} />}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return onMap ? (
    <JSXMarker
      ref={wrapperMarkerRef}
      position={loco.gps}
      iconOptions={{
        className: "",
        iconSize: [LocoMarkerConfig.MARKER_SIZE, LocoMarkerConfig.MARKER_SIZE],
        iconAnchor: [LocoMarkerConfig.MARKER_SIZE / 2, LocoMarkerConfig.MARKER_SIZE / 2],
      }}
    >
      {markerContent}
    </JSXMarker>
  ) : (
    markerContent
  );
});
LocoMarker.displayName = "UI.LocoMarker";

interface LocoIdTooltipProps {
  loco: TLocoData;
}

const LocoIdTooltip = (props: LocoIdTooltipProps) => {
  const { loco } = props;

  return (
    <motion.div
      className="relative rounded-full border border-gray-400 bg-white px-3 py-1 drop-shadow-sm"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ type: "spring" }}
    >
      <p className="text-navy-600 relative z-[2] whitespace-nowrap text-xs font-semibold">
        {loco.locoId}
      </p>
      <span className="absolute bottom-0 left-[50%] z-[1] h-2 w-2 translate-x-[-50%] translate-y-[55%] rotate-45 rounded-br-[2px] border-b border-r border-neutral-200 bg-white" />
    </motion.div>
  );
};

interface LocoInfoTooltipProps {
  loco: TLocoData;
  signalStatus: LocoSignalStatus;
}

const LocoInfoTooltip = (props: LocoInfoTooltipProps) => {
  const { loco, signalStatus } = props;

  const infos = [
    [
      { label: "Train ID", value: loco.info.trainId },
      { label: "Speed", value: `${loco.info.speedMps} (mph)` },
      { label: "Car Count", value: loco.info.carCout },
    ],
    [
      { label: "Route", value: `${loco.info.startLocation} → ${loco.info.endLocation}` },
      { label: "Weight", value: `${loco.info.totalWeightKg} (Metric Tons)` },
      { label: "Length", value: `${loco.info.totalLengthm} (feet)` },
    ],
  ];

  return (
    <div className="relative drop-shadow-sm">
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 48 }}
        exit={{ height: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 -translate-y-[90%] rounded-full bg-gradient-to-b from-transparent to-gray-400"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-[2] overflow-hidden rounded-[8px] border border-gray-400 bg-white"
      >
        {/* Header */}
        <div className="flex items-stretch justify-start gap-3 whitespace-nowrap p-3">
          <div
            className={cn(
              "h-auto w-[4px] rounded-full bg-gradient-to-b",
              locoSignalStatusMapping[signalStatus].themeClass,
            )}
          />
          <div>
            <p className="text-navy-600 mb-1 text-sm font-semibold">{loco.locoId}</p>
            <p className="text-xs text-neutral-400">
              Last Seen: {moment(loco.lastSeenUtc).startOf("minutes").fromNow()}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gray-400" />

        {/* Information Section */}
        <div className="flex items-center justify-center whitespace-nowrap bg-gray-50 text-xs text-neutral-400">
          {infos.map((group, index) => (
            <div key={index} className="p-3">
              {group.map((info, idx) => (
                <p key={idx} className="mb-1">
                  {info.label}: <strong className="text-neutral-500">{info.value}</strong>
                </p>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
