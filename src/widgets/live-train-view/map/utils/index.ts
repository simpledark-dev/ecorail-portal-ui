import moment from "moment";
import { LocoSignalStatus } from "../enums";
import { TScopeLocoData } from "../types";

export const transformToScopeLocos = <T>(
  input: T[],
  transformer: (item: T) => TScopeLocoData,
): TScopeLocoData[] => {
  return input.map(transformer);
};

export const classifyLocoSignalStatus = (lastSeenUtc: Date): LocoSignalStatus => {
  const currentTime = moment();
  const minutesDifference = currentTime.diff(lastSeenUtc, "minutes");

  if (minutesDifference < 1) {
    return LocoSignalStatus.LIVE_SIGNAL;
  } else if (minutesDifference >= 1 && minutesDifference <= 60) {
    return LocoSignalStatus.RECENTLY_SIGNAL;
  } else {
    return LocoSignalStatus.LOST_SIGNAL;
  }
};
