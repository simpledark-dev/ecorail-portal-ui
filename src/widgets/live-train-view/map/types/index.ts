export type TScopeStore = {
  locos: TScopeLocoData[];
  displayLocos: TScopeLocoData[];
  focusLocoId: string | null;
  showRailwayLayer: boolean;
  showInfoTooltipLocoMarkerInstanceId: string | null;
  showChildrenTooltipLocoClusterInstanceId: string | null;
  showLiveSignal: boolean;
  showRecentlySignal: boolean;
  showLostSignal: boolean;
  loading: boolean;
};

export type TScopeLocoData = {
  locoId: string;
  gps: { lat: number; lng: number };
  lastSeenUtc: Date;
  info: {
    stcId: string;
    trainId: number;
    speedMps: number;
    carCout: number;
    startLocation: string;
    endLocation: string;
    totalWeightKg: number;
    totalLengthm: number;
  };
};
