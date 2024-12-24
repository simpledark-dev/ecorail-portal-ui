import { useMemo } from "react";
import { LocoSignalStatus } from "../enums";

interface PieSegment {
  path: string;
  color: string;
}

export const usePieSegments = (
  livePercent: number,
  recentlyPercent: number,
  lostPercent: number,
  ClusterConfig: { MARKER_SIZE: number },
  locoSignalStatusMapping: any,
): PieSegment[] => {
  return useMemo(() => {
    const segments: PieSegment[] = [];
    let startAngle = 0;

    const calculateSegment = (percent: number, color: string): PieSegment => {
      if (percent === 100) {
        const path = `
          M ${ClusterConfig.MARKER_SIZE} 0
          A ${ClusterConfig.MARKER_SIZE} ${ClusterConfig.MARKER_SIZE} 0 1 1 ${ClusterConfig.MARKER_SIZE} ${ClusterConfig.MARKER_SIZE * 2}
          A ${ClusterConfig.MARKER_SIZE} ${ClusterConfig.MARKER_SIZE} 0 1 1 ${ClusterConfig.MARKER_SIZE} 0
          Z
        `;
        return { path, color };
      }

      const endAngle = startAngle + (percent / 100) * 360;
      const largeArc = percent > 50 ? 1 : 0;

      const startX =
        ClusterConfig.MARKER_SIZE +
        ClusterConfig.MARKER_SIZE * Math.cos((Math.PI * startAngle) / 180);
      const startY =
        ClusterConfig.MARKER_SIZE +
        ClusterConfig.MARKER_SIZE * Math.sin((Math.PI * startAngle) / 180);
      const endX =
        ClusterConfig.MARKER_SIZE +
        ClusterConfig.MARKER_SIZE * Math.cos((Math.PI * endAngle) / 180);
      const endY =
        ClusterConfig.MARKER_SIZE +
        ClusterConfig.MARKER_SIZE * Math.sin((Math.PI * endAngle) / 180);

      const path = `
        M ${ClusterConfig.MARKER_SIZE} ${ClusterConfig.MARKER_SIZE}
        L ${startX} ${startY}
        A ${ClusterConfig.MARKER_SIZE} ${ClusterConfig.MARKER_SIZE} 0 ${largeArc} 1 ${endX} ${endY}
        Z
      `;
      startAngle = endAngle;
      return { path, color };
    };

    segments.push(
      calculateSegment(livePercent, locoSignalStatusMapping[LocoSignalStatus.LIVE_SIGNAL].color),
    );
    segments.push(
      calculateSegment(
        recentlyPercent,
        locoSignalStatusMapping[LocoSignalStatus.RECENTLY_SIGNAL].color,
      ),
    );
    segments.push(
      calculateSegment(lostPercent, locoSignalStatusMapping[LocoSignalStatus.LOST_SIGNAL].color),
    );

    return segments;
  }, [livePercent, recentlyPercent, lostPercent, ClusterConfig, locoSignalStatusMapping]);
};
