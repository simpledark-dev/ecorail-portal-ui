import { Table, TableProps } from "..";
import { StoryFn } from "@storybook/react";
import MOCK_TRIPS from "../mocks/trip.mock.json";
import { nanoid } from "@/utils/common.util";

export default {
  title: "Components/Table",
  component: Table,
};

type TableDataType = {
  end_date_utc: string | null;
  crew_id: string;
  email: string;
  end_location: string;
  loco_id: string;
  simple_train_consist_id: string;
  start_date_utc: string;
  start_location: string;
  train_id: string;
  trip_complete: boolean;
  trip_duration_secs: number | null;
  trip_id: string;
  user_id: string;
  blocks_trip: string | number | null;
  data_availability: any[];
  __typename: string;
};

const Template: StoryFn<TableProps<TableDataType>> = (args) => {
  return (
    <div className="w-full">
      <Table {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  columns: [
    {
      key: "start_date_utc",
      label: "Start date",
    },
    {
      key: "end_date_utc",
      label: "End date",
    },
    {
      key: "start-end" as any,
      label: "Start → End",
      shortable: true,
      customHeadCell: {
        attributes: {
          className: "whitespace-nowrap",
        },
      },
      customDataCell: {
        render(item) {
          return (
            <>
              {item.start_location} → {item.end_location}
            </>
          );
        },
      },
    },
    {
      key: "trip_duration_secs",
      label: "Duration",
      shortable: true,
    },
    {
      key: "loco_id",
      label: "Lead Locomotive",
    },
    {
      key: "train_id",
      label: "Train",
    },
    {
      key: "crew_id",
      label: "Crew",
    },
  ],
  data: MOCK_TRIPS,
};

export const Pagination = Template.bind({});
Pagination.args = {
  columns: [
    {
      key: "start_date_utc",
      label: "Start date",
    },
    {
      key: "end_date_utc",
      label: "End date",
    },
    {
      key: "start-end" as any,
      label: "Start → End",
      shortable: true,
      customHeadCell: {
        attributes: {
          className: "whitespace-nowrap",
        },
      },
      customDataCell: {
        render(item) {
          return (
            <>
              {item.start_location} → {item.end_location}
            </>
          );
        },
      },
    },
    {
      key: "trip_duration_secs",
      label: "Duration",
      shortable: true,
    },
    {
      key: "loco_id",
      label: "Lead Locomotive",
    },
    {
      key: "train_id",
      label: "Train",
    },
    {
      key: "crew_id",
      label: "Crew",
    },
  ],
  data: MOCK_TRIPS,
  pagination: {
    itemsPerPage: 10,
  },
};

export const SnapPagination = Template.bind({});
SnapPagination.args = {
  columns: [
    {
      key: "start_date_utc",
      label: "Start date",
    },
    {
      key: "end_date_utc",
      label: "End date",
    },
    {
      key: "start-end" as any,
      label: "Start → End",
      shortable: true,
      customHeadCell: {
        attributes: {
          className: "whitespace-nowrap",
        },
      },
      customDataCell: {
        render(item) {
          return (
            <>
              {item.start_location} → {item.end_location}
            </>
          );
        },
      },
    },
    {
      key: "trip_duration_secs",
      label: "Duration",
      shortable: true,
    },
    {
      key: "loco_id",
      label: "Lead Locomotive",
    },
    {
      key: "train_id",
      label: "Train",
    },
    {
      key: "crew_id",
      label: "Crew",
    },
  ],
  data: MOCK_TRIPS,
  pagination: {
    itemsPerPage: 5,
    snapOptions: [
      { id: nanoid(), label: "5 / page", itemsPerPage: 5 },
      { id: nanoid(), label: "10 / page", itemsPerPage: 10 },
      { id: nanoid(), label: "25 / page", itemsPerPage: 25 },
      { id: nanoid(), label: "50 / page", itemsPerPage: 50 },
    ],
  },
  currentPage: 2,
};
