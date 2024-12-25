/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapConfig } from "../configs";
import "leaflet/dist/leaflet.css";
import { MapResizer } from "./MapResizer";
import { LocosLayer } from "./LocosLayer";
import { MapEvents } from "./MapEvents";
import { useScopeContext } from "../contexts/scope.context";

export const MapRoot = () => {
  const scopeContext = useScopeContext();
  const scopeStore = scopeContext.store;
  const showRailwayLayer = scopeStore.use.showRailwayLayer();

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

      {showRailwayLayer && (
        <TileLayer attribution={MapConfig.ATTRIBUTION} url={MapConfig.TILE_RAILWAY_URL} />
      )}
      <MapResizer />
      <LocosLayer />
      <MapEvents />
    </MapContainer>
  );
};
