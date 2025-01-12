export type TScopeStore = {
  trackCoordinates: TScopeTrackCoordinateData[];
  stations: TScopeStationData[];
  tsos: TScopeTSOData[];
  showInfoTooltipTSOLineInstanceId: string | null;
  showMilepostsLayer: boolean;
  showStationsLayer: boolean;
  showTSOsLayer: boolean;
  loading: boolean;
};

export type TScopeTrackCoordinateData = {
  gps: { lat: number; lng: number };
  milepost: number;
  absoluteTrackDistanceMiles: number;
};

export type TScopeStationData = {
  gps: { lat: number; lng: number };
  abbr: string;
};

export type TScopeTSOData = {
  tsoId: string;
  subdivision: string;
  speedLimitMph: number;
  startGps: { lat: number; lng: number };
  endGps: { lat: number; lng: number };
  startMile: number;
  endMile: number;
  startDistanceMiles: number;
  endDistanceMiles: number;
  updatedUtc: Date;
};
