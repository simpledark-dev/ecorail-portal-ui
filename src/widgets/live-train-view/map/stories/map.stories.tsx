import { StoryFn } from "@storybook/react";
import { Widget, WidgetProps } from "../components/Widget";
import moment from "moment";

export default {
  title: "Widget/LiveTrainView/Map",
  component: Widget,
};

const Template: StoryFn<WidgetProps> = (args) => {
  return (
    <div className="aspect-[1.5] max-h-[700px] w-full min-w-[800px]">
      <Widget {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  locos: [
    // LIVE_SIGNAL: Seen within the last minute
    {
      locoId: "VIA 900",
      gps: { lat: 43.68638309917087, lng: -79.31282032421005 },
      lastSeenUtc: moment().subtract(30, "seconds").toDate(), // 30 seconds ago
      info: {
        stcId: "stc-123",
        trainId: 1001,
        speedMps: 20,
        carCout: 5,
        startLocation: "TRTO",
        endLocation: "OTTW",
        totalWeightKg: 200000,
        totalLengthm: 300,
      },
    },
    // RECENTLY_SIGNAL: Seen within the last 60 minutes
    {
      locoId: "VIA 6424",
      gps: { lat: 43.67038872726949, lng: -79.38998434200256 },
      lastSeenUtc: moment().subtract(45, "minutes").toDate(), // 45 minutes ago
      info: {
        stcId: "stc-123",
        trainId: 1002,
        speedMps: 15,
        carCout: 8,
        startLocation: "TRTO",
        endLocation: "OTTW",
        totalWeightKg: 250000,
        totalLengthm: 350,
      },
    },
    // LOST_SIGNAL: Seen more than 60 minutes ago
    {
      locoId: "VIA 1234",
      gps: { lat: 43.7, lng: -79.4 },
      lastSeenUtc: moment().subtract(2, "hours").toDate(), // 2 hours ago
      info: {
        stcId: "stc-124",
        trainId: 1003,
        speedMps: 12,
        carCout: 6,
        startLocation: "TRTO",
        endLocation: "OTTW",
        totalWeightKg: 220000,
        totalLengthm: 320,
      },
    },
  ],
};

export const Cluster = Template.bind({});
Cluster.args = {
  locos: [
    {
      locoId: "VIA 900",
      gps: { lat: 43.68638309917087, lng: -70.31282032421005 },
      lastSeenUtc: moment().subtract(30, "seconds").toDate(),
      info: {
        stcId: "stc-123",
        trainId: 1001,
        speedMps: 20,
        carCout: 5,
        startLocation: "TRTO",
        endLocation: "OTTW",
        totalWeightKg: 200000,
        totalLengthm: 300,
      },
    },
    {
      locoId: "VIA 901",
      gps: { lat: 43.68638309917087, lng: -70.51282032421005 },
      lastSeenUtc: moment().subtract(15, "minutes").toDate(),
      info: {
        stcId: "stc-123",
        trainId: 1001,
        speedMps: 20,
        carCout: 5,
        startLocation: "TRTO",
        endLocation: "OTTW",
        totalWeightKg: 200000,
        totalLengthm: 300,
      },
    },
    {
      locoId: "VIA 6424",
      gps: { lat: 44.67038872726949, lng: -79.38998434200256 },
      lastSeenUtc: moment().subtract(45, "minutes").toDate(),
      info: {
        stcId: "stc-123",
        trainId: 1002,
        speedMps: 15,
        carCout: 8,
        startLocation: "TRTO",
        endLocation: "OTTW",
        totalWeightKg: 250000,
        totalLengthm: 350,
      },
    },
    {
      locoId: "VIA 1234",
      gps: { lat: 45.0, lng: -80.0 },
      lastSeenUtc: moment().subtract(2, "hours").toDate(),
      info: {
        stcId: "stc-124",
        trainId: 1003,
        speedMps: 12,
        carCout: 6,
        startLocation: "TRTO",
        endLocation: "OTTW",
        totalWeightKg: 220000,
        totalLengthm: 320,
      },
    },
    {
      locoId: "VIA 5678",
      gps: { lat: 45.1, lng: -80.0 },
      lastSeenUtc: moment().subtract(10, "seconds").toDate(),
      info: {
        stcId: "stc-124",
        trainId: 1003,
        speedMps: 12,
        carCout: 6,
        startLocation: "TRTO",
        endLocation: "OTTW",
        totalWeightKg: 220000,
        totalLengthm: 320,
      },
    },
  ],
};
