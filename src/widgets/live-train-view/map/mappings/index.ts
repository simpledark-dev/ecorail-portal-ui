import { LocoMarkerConfig } from "../configs";
import { LocoSignalStatus } from "../enums";

interface ILocoSignalStatusMapping
  extends Record<
    LocoSignalStatus,
    {
      label: string;
      description: string;
      themeClass: string;
      color: string;
      markerZindexBase: number;
    }
  > {}

export const locoSignalStatusMapping: ILocoSignalStatusMapping = {
  LIVE_SIGNAL: {
    label: "Live Signal",
    description: "(< 1 min)",
    themeClass: "from-blue-500 to-blue-300",
    color: "#7396D9",
    markerZindexBase: LocoMarkerConfig.MARKER_ZINDEX_BASE,
  },
  RECENTLY_SIGNAL: {
    label: "Recently Seen",
    description: "(1 - 60 mins)",
    themeClass: "from-orange-500 to-orange-300",
    color: "#FC8B22",
    markerZindexBase: LocoMarkerConfig.MARKER_ZINDEX_BASE - 100,
  },
  LOST_SIGNAL: {
    label: "Lost Signal",
    description: "(1 hr +)",
    themeClass: "from-gray-500 to-gray-300",
    color: "#C5C8CE",
    markerZindexBase: LocoMarkerConfig.MARKER_ZINDEX_BASE - 200,
  },
};
