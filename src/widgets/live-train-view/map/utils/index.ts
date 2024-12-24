import moment from "moment";
import { LocoSignalStatus } from "../enums";

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
