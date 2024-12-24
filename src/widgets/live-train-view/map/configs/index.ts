export const MapConfig = {
  TILE_URL: `https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/256/{z}/{x}/{y}@2x?lang=en&access_token=pk.eyJ1IjoiZ2FlbGR1b25nIiwiYSI6ImNrb2I1eDZ5NzIyMmEyb3MyZDlqeGRnZTAifQ.p_IcJvFNMnFDoym2YaxlGA`,
  ATTRIBUTION:
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  DEFAULT_CENTER: { lat: 43.64606677, lng: -79.37180328 },
  DEFAULT_ZOOM_LEVEL: 12,
  RECENTER_PADDING: 200,
};

export const LocoMarkerConfig = {
  MARKER_SIZE: 36,
  MARKER_ZINDEX_BASE: 500,
  MARKER_ZINDEX_ON_SHOW_INFO_TOOLTIP: 2000,
};

export const ClusterConfig = {
  MARKER_SIZE: 48,
  MARKER_ZINDEX_BASE: 1000,
  MARKER_ZINDEX_ON_SHOW_CHILDREN_TOOLTIP: 1999,
  LOCO_DISTANCE_THRESHOLD: 20,
};
