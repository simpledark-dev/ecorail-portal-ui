/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { JSXMarker } from "@/core/jsx-marker";
import { nanoid } from "@/utils/common.util";
import React from "react";
import { StationMarkerConfig } from "../configs";
import { TScopeStationData } from "../types";
import { motion } from "framer-motion";
import { useMap } from "react-leaflet";
import { useMarkerZIndex } from "@/hooks/useMarkerZIndex";
import { useScopeContext } from "../contexts/scope.context";
import L from "leaflet";

interface StationMarkerProps {
  idx: number;
  station: TScopeStationData;
}

export const StationMarker = React.memo((props: StationMarkerProps) => {
  const { idx, station } = props;

  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const showMilepostsLayer = scopeStore.use.showMilepostsLayer();
  const showTSOsLayer = scopeStore.use.showTSOsLayer();

  const instanceId = React.useRef<string>(nanoid("alpha"));
  const wrapperMarkerRef = React.useRef<L.Marker>(null);
  const markerRef = React.useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = React.useState(false);
  const displayMode = React.useMemo(() => {
    if (showMilepostsLayer || showTSOsLayer) {
      return 2;
    }
    return 1;
  }, [showMilepostsLayer, showTSOsLayer]);

  const map = useMap();
  useMarkerZIndex(
    {
      map: map,
      markerRef: markerRef,
      zIndex: isHover
        ? StationMarkerConfig.MARKER_ZINDEX_ON_HOVER + idx
        : StationMarkerConfig.MARKER_ZINDEX_BASE + idx,
      force: false,
    },
    [],
  );

  const markerEventHandler: L.LeafletEventHandlerFnMap = {
    mouseover: () => {
      setIsHover(true);
    },
    mouseout: () => {
      setIsHover(false);
    },
  };

  return (
    <>
      <JSXMarker
        ref={wrapperMarkerRef}
        position={station.gps}
        iconOptions={{
          className: "",
          iconSize: [StationMarkerConfig.MARKER_SIZE, StationMarkerConfig.MARKER_SIZE],
          iconAnchor: [StationMarkerConfig.MARKER_SIZE / 2, StationMarkerConfig.MARKER_SIZE / 2],
        }}
        eventHandlers={markerEventHandler}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          ref={markerRef}
          transition={{ type: "spring" }}
          className="relative h-full w-full"
        >
          {/* Badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <StationBadge station={station} mode={displayMode} />
          </div>
        </motion.div>
      </JSXMarker>
    </>
  );
});
StationMarker.displayName = "UI.StationMarker";

interface StationBadgeProps {
  station: TScopeStationData;
  mode: number;
}

const StationBadge = (props: StationBadgeProps) => {
  const { station, mode } = props;

  return (
    <div className="relative drop-shadow-sm">
      <motion.div
        initial={{ height: 0 }}
        animate={mode === 1 ? { height: 0, y: 0 } : { height: 48, y: -40 }}
        exit={{ height: 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute left-1/2 top-2 z-[1] w-[3px] -translate-x-1/2 select-none rounded-full bg-gradient-to-b from-gray-500 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={mode === 1 ? { opacity: 1, y: 0 } : { opacity: 1, y: -40 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-[2] flex items-center justify-center gap-1 rounded-full border border-gray-400 bg-white p-1"
      >
        <div
          className="relative z-[2] aspect-square h-5 w-5 shrink-0 rounded-full"
          css={css`
            background: radial-gradient(#e1e4e9, #a2a7b1);
            &::after {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 40%;
              height: 40%;
              background: #ffffff;
              border-radius: 50%;
              box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
            }
          `}
        />
        <p className="mx-1 text-xs font-semibold text-navy-700">{station.abbr}</p>
      </motion.div>
    </div>
  );
};
