import { JSXMarker } from "@/core/jsx-marker";
import { TScopeTrackCoordinateData } from "../types";
import React from "react";
import { cn, nanoid } from "@/utils/common.util";
import { MilepostMarkerConfig } from "../configs";
import { motion } from "framer-motion";
import { useMap } from "react-leaflet";
import { useMarkerZIndex } from "@/hooks/useMarkerZIndex";

interface MilepostMarkerProps {
  milepost: TScopeTrackCoordinateData;
}

export const MilepostMarker = React.memo((props: MilepostMarkerProps) => {
  const { milepost } = props;

  const instanceId = React.useRef<string>(nanoid("alpha"));
  const wrapperMarkerRef = React.useRef<L.Marker>(null);
  const markerRef = React.useRef<HTMLDivElement>(null);

  const map = useMap();
  useMarkerZIndex(
    {
      map: map,
      markerRef: markerRef,
      zIndex: MilepostMarkerConfig.MARKER_ZINDEX_BASE,
      force: false,
    },
    [],
  );

  return (
    <JSXMarker
      ref={wrapperMarkerRef}
      position={milepost.gps}
      iconOptions={{
        className: "",
        iconSize: [MilepostMarkerConfig.MARKER_SIZE, MilepostMarkerConfig.MARKER_SIZE],
        iconAnchor: [MilepostMarkerConfig.MARKER_SIZE / 2, MilepostMarkerConfig.MARKER_SIZE / 2],
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
        <div
          className={cn(
            "relative z-[5] flex h-full w-full items-center justify-center rounded-full border-[3px] border-blue-500 bg-white drop-shadow-sm",
          )}
        >
          <p className="text-[10px] font-semibold text-navy-700">{milepost.milepost}</p>
        </div>
      </motion.div>
    </JSXMarker>
  );
});
MilepostMarker.displayName = "UI.MilepostMarker";
