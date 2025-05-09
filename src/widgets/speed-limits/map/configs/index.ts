export const MapConfig = {
  TILE_URL: `https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/256/{z}/{x}/{y}@2x?lang=en&access_token=pk.eyJ1IjoiZ2FlbGR1b25nIiwiYSI6ImNrb2I1eDZ5NzIyMmEyb3MyZDlqeGRnZTAifQ.p_IcJvFNMnFDoym2YaxlGA`,
  ATTRIBUTION:
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  DEFAULT_CENTER: { lat: 43.64606677, lng: -79.37180328 },
  DEFAULT_ZOOM_LEVEL: 12,
  RECENTER_PADDING: 100,
};

export const TrackLineConfig = {
  DENSITY_THRESHOLD: 0.002,
};

export const StationMarkerConfig = {
  MARKER_SIZE: 16,
  MARKER_ZINDEX_BASE: 1000,
  MARKER_ZINDEX_ON_HOVER: 5000,
};

export const MilepostsLayerConfig = {
  MILEPOST_DISTANCE_THRESHOLD: 20,
};

export const MilepostMarkerConfig = {
  MARKER_SIZE: 28,
  MARKER_ZINDEX_BASE: 500,
};

export const TSOLineConfig = {
  DENSITY_THRESHOLD: 0.002,
};

export const TSOMarkerConfig = {
  MARKER_SIZE: 32,
  MARKER_ZINDEX_BASE: 2000,
};

export const TSOTooltipConfig = {
  TOOLTIP_ZINDEX_BASE: 5000,
};
