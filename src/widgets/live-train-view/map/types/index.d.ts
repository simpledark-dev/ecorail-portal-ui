import { LocoSignalStatus } from "../enums";

export type TScopeStore = {
  locos: TLocoData[];
  displayLocos: TLocoData[];
  showInfoTooltipLocoMarkerInstanceId: string | null;
  showChildrenTooltipLocoClusterInstanceId: string | null;
  showLiveSignal: boolean;
  showRecentlySignal: boolean;
  showLostSignal: boolean;
};

export type TLocoData = {
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
