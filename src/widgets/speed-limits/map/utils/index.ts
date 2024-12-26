import { TScopeTrackCoordinateData } from "../types";
import { TScopeStationData, TScopeTSOData } from "../types/index";
import _ from "lodash";

export const transformToScopeTrackCoordinates = <T>(
  input: T[],
  transformer: (item: T) => TScopeTrackCoordinateData,
): TScopeTrackCoordinateData[] => {
  return input.map(transformer);
};

export const transformToScopeStations = <T>(
  input: T[],
  transformer: (item: T) => TScopeStationData,
): TScopeStationData[] => {
  return input.map(transformer);
};

export const transformToScopeTSOs = <T>(
  input: T[],
  transformer: (item: T) => TScopeTSOData,
): TScopeTSOData[] => {
  return input.map(transformer);
};

export const getWholeMilepostsFromTrackCoordinates = (
  trackCoordinates: TScopeTrackCoordinateData[],
  zoomLevel: number,
): TScopeTrackCoordinateData[] => {
  const minFactor = 5;
  const maxFactor = 50;
  const baseFactor = 10;

  const divisionFactor = Math.min(
    maxFactor,
    Math.max(minFactor, baseFactor * Math.pow(2, 10 - zoomLevel)),
  );

  const uniqueTrackCoords = _.uniqBy(trackCoordinates, (coord) =>
    [coord.milepost, coord.gps.lat, coord.gps.lng].join(),
  );

  const wholeMilepostTrackCoords = uniqueTrackCoords.filter(
    (coord) => coord.milepost % divisionFactor === 0,
  );

  const uniqueWholeMileposts = _.uniqBy(wholeMilepostTrackCoords, "milepost");

  return uniqueWholeMileposts;
};

export const getTSOCoordinatesFromTrackCoordinates = (
  tso: TScopeTSOData,
  trackCoords: TScopeTrackCoordinateData[],
): TScopeTrackCoordinateData[] => {
  if (!tso || !trackCoords) return [];

  const minDistance = Math.min(tso.startDistanceMiles, tso.endDistanceMiles);
  const maxDistance = Math.max(tso.startDistanceMiles, tso.endDistanceMiles);

  const coordsBetweenStartAndEnd = trackCoords
    .filter(
      (coord) =>
        coord.absoluteTrackDistanceMiles >= minDistance &&
        coord.absoluteTrackDistanceMiles <= maxDistance,
    )
    .map((coord) => ({
      gps: coord.gps,
      milepost: coord.milepost,
      absoluteTrackDistanceMiles: coord.absoluteTrackDistanceMiles,
    }));

  return [
    {
      gps: tso.startGps,
      milepost: tso.startMile,
      absoluteTrackDistanceMiles: tso.startDistanceMiles,
    },
    ...coordsBetweenStartAndEnd,
    {
      gps: tso.endGps,
      milepost: tso.endMile,
      absoluteTrackDistanceMiles: tso.endDistanceMiles,
    },
  ];
};

export const filterMilepostsOutsideTSOs = (
  trackCoordinates: TScopeTrackCoordinateData[],
  tsos: TScopeTSOData[],
): TScopeTrackCoordinateData[] => {
  return trackCoordinates.filter((coord) => {
    return !tsos.some(
      (tso) =>
        coord.milepost >= Math.min(tso.startMile, tso.endMile) &&
        coord.milepost <= Math.max(tso.startMile, tso.endMile),
    );
  });
};
