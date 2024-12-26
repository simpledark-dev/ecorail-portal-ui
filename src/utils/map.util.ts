import L from "leaflet";

export const calculateCenter = (points: { lat: number; lng: number }[]) => {
  const totalLat = points.reduce((sum, point) => sum + point.lat, 0);
  const totalLng = points.reduce((sum, point) => sum + point.lng, 0);

  const centerLat = totalLat / points.length;
  const centerLng = totalLng / points.length;

  return { lat: centerLat, lng: centerLng };
};

export const calculateRadius = (
  center: { lat: number; lng: number },
  points: { lat: number; lng: number }[],
) => {
  const distances = points.map((point) => {
    const distance = L.latLng(center.lat, center.lng).distanceTo(L.latLng(point.lat, point.lng));
    return distance;
  });

  return Math.max(...distances);
};

export const createClusters = <T extends { gps: { lat: number; lng: number } }>(
  data: T[],
  map: L.Map,
  threshold: number,
): T[][] => {
  const clusters: T[][] = [];

  const pixels = data.map((item) => {
    const point = map.latLngToLayerPoint(L.latLng(item.gps.lat, item.gps.lng));
    return { item, point };
  });

  pixels.forEach((pixel) => {
    let addedToCluster = false;

    for (const cluster of clusters) {
      const clusterCenter = map.latLngToLayerPoint(
        L.latLng(cluster[0].gps.lat, cluster[0].gps.lng),
      );

      const distance = clusterCenter.distanceTo(pixel.point);
      if (distance < threshold) {
        cluster.push(pixel.item);
        addedToCluster = true;
        break;
      }
    }

    if (!addedToCluster) {
      clusters.push([pixel.item]);
    }
  });

  return clusters;
};

export const reduceCoordinatesDensity = <T extends { gps: { lat: number; lng: number } }>(
  data: T[],
  threshold: number,
): T[] => {
  if (data.length < 2) return data;

  const result = [data[0]];

  for (let i = 1; i < data.length - 1; i++) {
    const prev = result[result.length - 1].gps;
    const curr = data[i].gps;
    const distance = Math.sqrt(Math.pow(curr.lat - prev.lat, 2) + Math.pow(curr.lng - prev.lng, 2));

    if (distance > threshold) {
      result.push(data[i]);
    }
  }

  result.push(data[data.length - 1]);

  return result;
};
