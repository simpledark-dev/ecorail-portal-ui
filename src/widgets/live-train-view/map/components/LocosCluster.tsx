import React from "react";
import { TScopeLocoData } from "../types";
import { classifyLocoSignalStatus } from "../utils";
import { LocoSignalStatus } from "../enums";
import { JSXMarker } from "@/core/jsx-marker";
import { nanoid } from "@/utils/common.util";
import { ClusterConfig } from "../configs";
import { AnimatePresence, motion } from "framer-motion";
import { locoSignalStatusMapping } from "../mappings";
import { LocoMarker } from "./LocoMarker";
import { usePieSegments } from "../hooks/usePieSegments";
import { useMap } from "react-leaflet";
import { useMarkerZIndex } from "@/hooks/useMarkerZIndex";
import { useScopeContext } from "../contexts/scope.context";

interface LocosClusterProps {
  locos: TScopeLocoData[];
  gps: { lat: number; lng: number };
}

export const LocosCluster = (props: LocosClusterProps) => {
  const { locos, gps } = props;

  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const showChildrenTooltipLocoClusterInstanceId =
    scopeStore.use.showChildrenTooltipLocoClusterInstanceId();

  const instanceId = React.useRef<string>(nanoid("alpha"));
  const wrapperMarkerRef = React.useRef<L.Marker>(null);
  const markerRef = React.useRef<HTMLDivElement>(null);

  const classifiedLocos = React.useMemo(() => {
    return locos.map((loco) => ({
      ...loco,
      status: classifyLocoSignalStatus(loco.lastSeenUtc),
    }));
  }, [locos]);

  const statusCounts = React.useMemo(() => {
    return classifiedLocos.reduce(
      (counts, loco) => {
        counts[loco.status]++;
        return counts;
      },
      {
        [LocoSignalStatus.LIVE_SIGNAL]: 0,
        [LocoSignalStatus.RECENTLY_SIGNAL]: 0,
        [LocoSignalStatus.LOST_SIGNAL]: 0,
      },
    );
  }, [classifiedLocos]);

  const totalLocos = React.useMemo(() => locos.length, [locos]);
  const livePercent = React.useMemo(
    () => (statusCounts[LocoSignalStatus.LIVE_SIGNAL] / totalLocos) * 100,
    [statusCounts, totalLocos],
  );
  const recentlyPercent = React.useMemo(
    () => (statusCounts[LocoSignalStatus.RECENTLY_SIGNAL] / totalLocos) * 100,
    [statusCounts, totalLocos],
  );
  const lostPercent = React.useMemo(
    () => (statusCounts[LocoSignalStatus.LOST_SIGNAL] / totalLocos) * 100,
    [statusCounts, totalLocos],
  );

  const isShowChildrenTooltip = React.useMemo(() => {
    return showChildrenTooltipLocoClusterInstanceId === instanceId.current;
  }, [showChildrenTooltipLocoClusterInstanceId]);

  const pieSegments = usePieSegments(
    livePercent,
    recentlyPercent,
    lostPercent,
    ClusterConfig,
    locoSignalStatusMapping,
  );

  const map = useMap();
  useMarkerZIndex(
    {
      map: map,
      markerRef: markerRef,
      zIndex: isShowChildrenTooltip
        ? ClusterConfig.MARKER_ZINDEX_ON_SHOW_CHILDREN_TOOLTIP
        : ClusterConfig.MARKER_ZINDEX_BASE,
    },
    [],
  );

  const handleToggleTooltip = React.useCallback(() => {
    scopeStore.setState({
      showInfoTooltipLocoMarkerInstanceId: null,
      showChildrenTooltipLocoClusterInstanceId: isShowChildrenTooltip ? null : instanceId.current,
    });

    return () => {
      if (isShowChildrenTooltip) {
        scopeStore.setState({
          showChildrenTooltipLocoClusterInstanceId: null,
        });
      }
    };
  }, [isShowChildrenTooltip]);

  return (
    <>
      <JSXMarker
        ref={wrapperMarkerRef}
        position={gps}
        iconOptions={{
          className: "",
          iconSize: [ClusterConfig.MARKER_SIZE, ClusterConfig.MARKER_SIZE],
          iconAnchor: [ClusterConfig.MARKER_SIZE / 2, ClusterConfig.MARKER_SIZE / 2],
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          ref={markerRef}
          transition={{ type: "spring" }}
          className="relative h-full w-full"
        >
          {/* Circle */}
          <svg
            width={ClusterConfig.MARKER_SIZE}
            height={ClusterConfig.MARKER_SIZE}
            viewBox={`0 0 ${ClusterConfig.MARKER_SIZE * 2} ${ClusterConfig.MARKER_SIZE * 2}`}
            className="relative z-[5] drop-shadow-sm"
            onClick={handleToggleTooltip}
          >
            {pieSegments.map((segment, index) => (
              <path key={index} d={segment.path} fill={segment.color} />
            ))}

            <circle
              cx={ClusterConfig.MARKER_SIZE}
              cy={ClusterConfig.MARKER_SIZE}
              r={ClusterConfig.MARKER_SIZE / 1.4}
              fill="white"
            />

            <text
              x={ClusterConfig.MARKER_SIZE}
              y={ClusterConfig.MARKER_SIZE}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-navy-600 text-3xl font-semibold"
            >
              {totalLocos}
            </text>
          </svg>

          {/* Tooltip */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 translate-y-[100%]">
            <AnimatePresence>
              {isShowChildrenTooltip && <LocosChildrenToolTip locos={locos} />}
            </AnimatePresence>
          </div>
        </motion.div>
      </JSXMarker>
    </>
  );
};

interface LocosChildrenToolTipProps {
  locos: TScopeLocoData[];
}

const LocosChildrenToolTip = (props: LocosChildrenToolTipProps) => {
  const { locos } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-end gap-4 rounded-full border border-gray-400 bg-white/60 px-6 py-2"
    >
      {locos.map((loco) => (
        <div key={loco.locoId} className="h-8 w-8">
          <LocoMarker loco={loco} onMap={false} />
        </div>
      ))}
    </motion.div>
  );
};
