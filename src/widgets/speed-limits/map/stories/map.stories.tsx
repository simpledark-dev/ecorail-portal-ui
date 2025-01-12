import { Meta, StoryFn } from "@storybook/react";
import { MapWidget, MapWidgetProps } from "..";
import {
  transformToScopeStations,
  transformToScopeTrackCoordinates,
  transformToScopeTSOs,
} from "../utils";
import MOCK_TRACK_COORDINATES from "../mocks/track.mock.json";
import MOCK_STATIONS from "../mocks/stations.mock.json";
import MOCK_TSOS from "../mocks/tsos.mock.json";

export default {
  title: "Widgets/SpeedLimits/Map",
  component: MapWidget,
} as Meta;

const Template: StoryFn<MapWidgetProps> = (args) => {
  return (
    <div className="aspect-[1.5] max-h-[700px] w-full min-w-[800px]">
      <MapWidget {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  trackCoordinates: transformToScopeTrackCoordinates(
    MOCK_TRACK_COORDINATES as any,
    (item: any) => ({
      gps: { lat: item.gps_coordinates.lat, lng: item.gps_coordinates.lng },
      milepost: item.milepost,
      absoluteTrackDistanceMiles: item.absolute_track_distance_miles,
    }),
  ),
  stations: transformToScopeStations(MOCK_STATIONS as any, (item: any) => ({
    gps: { lat: item.lat, lng: item.lng },
    abbr: item.abbreviation,
  })),
  tsos: transformToScopeTSOs(MOCK_TSOS as any, (item: any) => ({
    tsoId: item.temporary_speed_limit_id,
    speedLimitMph: item.speed_limit_mph,
    subdivision: item.subdivision,
    startGps: { lat: item.start_gps_coordinates.lat, lng: item.start_gps_coordinates.lng },
    endGps: { lat: item.end_gps_coordinates.lat, lng: item.end_gps_coordinates.lng },
    startMile: item.start_mile,
    endMile: item.end_mile,
    startDistanceMiles: item.start_distance_miles,
    endDistanceMiles: item.end_distance_miles,
    updatedUtc: new Date(item.updated_at_utc),
  })),
};

export const WithLoading = Template.bind({});
WithLoading.args = {
  ...Default.args,
  loading: true,
};
