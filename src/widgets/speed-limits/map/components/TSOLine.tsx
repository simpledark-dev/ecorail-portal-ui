import React from "react";
import { TScopeTSOData } from "../types";
import { getTSOCoordinatesFromTrackCoordinates } from "../utils";
import { useScopeContext } from "../contexts/scope.context";
import { reduceCoordinatesDensity } from "@/utils/map.util";
import { TSOLineConfig, TSOMarkerConfig, TSOTooltipConfig } from "../configs";
import { Polyline, useMap } from "react-leaflet";
import { JSXMarker } from "@/core/jsx-marker";
import { AnimatePresence, motion } from "framer-motion";
import { cn, nanoid } from "@/utils/common.util";
import L from "leaflet";
import moment from "moment";
import { useMarkerZIndex } from "@/hooks/useMarkerZIndex";

interface TSOLineProps {
  tso: TScopeTSOData;
}

export const TSOLine = React.memo((props: TSOLineProps) => {
  const { tso } = props;
  const scopeContext = useScopeContext();

  const scopeStore = scopeContext.store;
  const trackCoordinates = scopeStore.use.trackCoordinates();
  const showInfoTooltipTSOLineInstanceId = scopeStore.use.showInfoTooltipTSOLineInstanceId();

  const instanceId = React.useRef<string>(nanoid("alpha"));
  const startWrapperMarkerRef = React.useRef<L.Marker>(null);
  const startMarkerRef = React.useRef<HTMLDivElement>(null);
  const endWrapperMarkerRef = React.useRef<L.Marker>(null);
  const endMarkerRef = React.useRef<HTMLDivElement>(null);
  const [clickedCoord, setClickedCoord] = React.useState<{ lat: number; lng: number } | null>(null);

  const tsoCoordinates = React.useMemo(() => {
    return getTSOCoordinatesFromTrackCoordinates(tso, trackCoordinates);
  }, [tso]);

  const reducedDensityCoordinates = React.useMemo(() => {
    return reduceCoordinatesDensity(tsoCoordinates, TSOLineConfig.DENSITY_THRESHOLD);
  }, [tsoCoordinates]);

  const isShowInfoTooltip = React.useMemo(() => {
    return showInfoTooltipTSOLineInstanceId === instanceId.current;
  }, [showInfoTooltipTSOLineInstanceId]);

  const markerEventHandlers: L.LeafletEventHandlerFnMap = {
    click: (event: L.LeafletMouseEvent) => {
      const clickedLatLng = event.latlng;

      scopeStore.setState({
        showInfoTooltipTSOLineInstanceId: isShowInfoTooltip ? null : instanceId.current,
      });
      setClickedCoord(
        isShowInfoTooltip ? null : { lat: clickedLatLng.lat, lng: clickedLatLng.lng },
      );
    },
  };

  const map = useMap();
  useMarkerZIndex(
    {
      map: map,
      markerRef: startMarkerRef,
      zIndex: TSOMarkerConfig.MARKER_ZINDEX_BASE,
    },
    [],
  );
  useMarkerZIndex(
    {
      map: map,
      markerRef: endMarkerRef,
      zIndex: TSOMarkerConfig.MARKER_ZINDEX_BASE,
    },
    [],
  );

  return (
    <>
      {/* Main Line */}
      <Polyline
        positions={reducedDensityCoordinates.map((coord) => [coord.gps.lat, coord.gps.lng])}
        weight={5}
        color="#FFA33A"
        eventHandlers={markerEventHandlers}
      />
      {/* Support Line */}
      <Polyline
        positions={reducedDensityCoordinates.map((coord) => [coord.gps.lat, coord.gps.lng])}
        weight={20}
        color="#FFA33A"
        opacity={0}
        eventHandlers={markerEventHandlers}
      />

      <JSXMarker
        ref={startWrapperMarkerRef}
        position={tso.startGps}
        iconOptions={{
          className: "",
          iconSize: [TSOMarkerConfig.MARKER_SIZE, TSOMarkerConfig.MARKER_SIZE],
          iconAnchor: [TSOMarkerConfig.MARKER_SIZE / 2, TSOMarkerConfig.MARKER_SIZE / 2],
        }}
        eventHandlers={markerEventHandlers}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          ref={startMarkerRef}
          transition={{ type: "spring" }}
          className="relative h-full w-full"
        >
          {/* Circle */}
          <div
            className={cn(
              "relative z-[5] flex h-full w-full items-center justify-center rounded-full border-[3px] border-[#FFA33A] bg-white drop-shadow-sm",
            )}
          >
            <p className="text-[10px] font-semibold text-navy-700">{tso.startMile.toFixed(1)}</p>
          </div>
        </motion.div>
      </JSXMarker>

      <JSXMarker
        ref={endWrapperMarkerRef}
        position={tso.endGps}
        iconOptions={{
          className: "",
          iconSize: [TSOMarkerConfig.MARKER_SIZE, TSOMarkerConfig.MARKER_SIZE],
          iconAnchor: [TSOMarkerConfig.MARKER_SIZE / 2, TSOMarkerConfig.MARKER_SIZE / 2],
        }}
        eventHandlers={markerEventHandlers}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          ref={endMarkerRef}
          transition={{ type: "spring" }}
          className="relative h-full w-full"
        >
          {/* Circle */}
          <div
            className={cn(
              "relative z-[5] flex h-full w-full items-center justify-center rounded-full border-[3px] border-[#FFA33A] bg-white drop-shadow-sm",
            )}
          >
            <p className="text-[10px] font-semibold text-navy-700">{tso.endMile.toFixed(1)}</p>
          </div>
        </motion.div>
      </JSXMarker>

      <AnimatePresence>
        {isShowInfoTooltip && clickedCoord && <TSOTooltip gps={clickedCoord} tso={tso} />}
      </AnimatePresence>
    </>
  );
});
TSOLine.displayName = "UI.TSOLine";

interface TSOTooltipProps {
  gps: { lat: number; lng: number };
  tso: TScopeTSOData;
}

const TSOTooltip = (props: TSOTooltipProps) => {
  const { gps, tso } = props;

  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;

  const tsoInfos = [
    {
      label: "Subdivision",
      value: tso.subdivision,
    },
    {
      label: "Start mile",
      value: tso.startMile,
    },
    {
      label: "End mile",
      value: tso.endMile,
    },
  ];

  const wrapperMarkerRef = React.useRef<L.Marker>(null);
  const markerRef = React.useRef<HTMLDivElement>(null);

  const markerEventHandlers: L.LeafletEventHandlerFnMap = {
    click: (event: L.LeafletMouseEvent) => {
      scopeStore.setState({
        showInfoTooltipTSOLineInstanceId: null,
      });
    },
  };

  const map = useMap();
  useMarkerZIndex(
    {
      map: map,
      markerRef: markerRef,
      zIndex: TSOTooltipConfig.TOOLTIP_ZINDEX_BASE,
    },
    [gps],
  );

  return (
    <JSXMarker
      ref={wrapperMarkerRef}
      key={`${gps.lat}-${gps.lng}`}
      position={gps}
      iconOptions={{
        className: "",
        iconSize: [TSOMarkerConfig.MARKER_SIZE, TSOMarkerConfig.MARKER_SIZE],
        iconAnchor: [TSOMarkerConfig.MARKER_SIZE / 2, TSOMarkerConfig.MARKER_SIZE / 2],
      }}
      eventHandlers={markerEventHandlers}
    >
      <div ref={markerRef} className="relative h-full w-full">
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 translate-y-[100%]">
          <div className="relative drop-shadow-sm">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 48 }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute left-1/2 top-0 w-[3px] -translate-x-1/2 -translate-y-[90%] select-none rounded-full bg-gradient-to-b from-transparent to-gray-400"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-[2] overflow-hidden rounded-[8px] border border-gray-500 bg-white"
            >
              {/* Header */}
              <div className="flex items-center justify-start gap-3 whitespace-nowrap p-3">
                <div className="outline-3 flex aspect-square h-[52px] w-[52px] flex-col items-center justify-center rounded-[8px] border-2 border-navy-700 bg-[#ffa33a] p-2 outline outline-[#ffa33a]">
                  <p className="text-center text-xs font-semibold uppercase text-navy-700">Limit</p>
                  <p className="text-center text-base font-bold uppercase text-navy-700">
                    {tso.speedLimitMph}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold text-navy-600">TSO</p>
                  <p className="text-xs text-neutral-400">
                    Updated: {moment(tso.updatedUtc).startOf("minutes").fromNow()}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-[1px] w-full bg-gray-400" />

              {/* Information Section */}
              <div className="space-y-1 whitespace-nowrap bg-gray-50 p-3">
                {tsoInfos.map((item, index) => (
                  <div key={index} className="flex items-center justify-between gap-5">
                    <p className="text-xs text-neutral-400">{item.label}</p>
                    <p className="text-sm font-semibold text-navy-700">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </JSXMarker>
  );
};
