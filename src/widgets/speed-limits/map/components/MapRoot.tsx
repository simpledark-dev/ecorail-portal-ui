/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapConfig } from "../configs";
import { MapResizer } from "./MapResizer";
import { TrackLineLayer } from "./TrackLineLayer";
import { StationsLayer } from "./StationsLayer";
import { MilepostsLayer } from "./MilepostsLayer";
import { useScopeContext } from "../contexts/scope.context";
import { MapEvents } from "./MapEvents";
import { TSOsLayer } from "./TSOsLayer";

export const MapRoot = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const showMilepostsLayer = scopeStore.use.showMilepostsLayer();
  const showStationsLayer = scopeStore.use.showStationsLayer();
  const showTSOsLayer = scopeStore.use.showTSOsLayer();

  return (
    <MapContainer
      center={MapConfig.DEFAULT_CENTER}
      zoom={MapConfig.DEFAULT_ZOOM_LEVEL}
      scrollWheelZoom={true}
      minZoom={5}
      maxZoom={17}
      css={css`
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
        z-index: 1;

        & .leaflet-control-attribution {
          opacity: 0 !important;
        }
      `}
      zoomControl={false}
    >
      <TileLayer attribution={MapConfig.ATTRIBUTION} url={MapConfig.TILE_URL} />
      <MapResizer />
      <MapEvents />
      <TrackLineLayer />
      {showStationsLayer && <StationsLayer />}
      {showMilepostsLayer && <MilepostsLayer />}
      {showTSOsLayer && <TSOsLayer />}
    </MapContainer>
  );
};
