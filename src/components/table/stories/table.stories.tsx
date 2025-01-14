import { Table, TableProps } from "..";
import { StoryFn } from "@storybook/react";
import { nanoid } from "@/utils/common.util";
import moment from "moment";
import MOCK_TRIPS from "../mocks/trip.mock.json";
import MOCK_TRIP_DETAILS from "../mocks/trip-details.mock.json";
import { extractTimeComponentsFromMinutes } from "@/utils/datetime.util";
import React from "react";
import { Collapse } from "@/elements/collapse";

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
  data_availability: string[];
  __typename: string;
  "start-end"?: string;
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
      format(value) {
        return moment(value).format("LLL");
      },
    },
    {
      key: "end_date_utc",
      label: "End date",
      format(value) {
        return moment(value).format("LLL");
      },
    },
    {
      key: "start-end" as const,
      label: "Start → End",
      customHeadCell: {
        attributes: {
          className: "whitespace-nowrap",
        },
      },
      customDataCell: {
        attributes: {
          className: "whitespace-nowrap",
        },
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
      format(value) {
        return moment(value).format("LLL");
      },
    },
    {
      key: "end_date_utc",
      label: "End date",
      format(value) {
        return moment(value).format("LLL");
      },
    },
    {
      key: "start-end" as const,
      label: "Start → End",
      customHeadCell: {
        attributes: {
          className: "whitespace-nowrap",
        },
      },
      customDataCell: {
        attributes: {
          className: "whitespace-nowrap",
        },
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
      shortable: true,
      format(value) {
        return moment(value).format("LLL");
      },
    },
    {
      key: "end_date_utc",
      label: "End date",
      shortable: true,
      format(value) {
        return moment(value).format("LLL");
      },
    },
    {
      key: "start-end" as const,
      label: "Start → End",
      customHeadCell: {
        attributes: {
          className: "whitespace-nowrap",
        },
      },
      customDataCell: {
        attributes: {
          className: "whitespace-nowrap",
        },
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
    itemsPerPage: 25,
    snapOptions: [
      { id: nanoid(), label: "5 / page", itemsPerPage: 5 },
      { id: nanoid(), label: "10 / page", itemsPerPage: 10 },
      { id: nanoid(), label: "25 / page", itemsPerPage: 25 },
      { id: nanoid(), label: "50 / page", itemsPerPage: 50 },
    ],
  },
  currentPage: 2,
};

export const WithTruncate = Template.bind({});
WithTruncate.args = {
  columns: [
    {
      key: "start_date_utc",
      label: "Start date",
      shortable: true,
      format: (value) => {
        return moment(value).format("LLL");
      },
    },
    {
      key: "end_date_utc",
      label: "End date",
      shortable: true,
      format: (value) => {
        return moment(value).format("LLL");
      },
    },
    {
      virtualKey: {
        key: "start-end",
        compute: (item) => `${item.start_location} → ${item.end_location}`,
      },
      label: "Start → End",
      shortable: true,
      customHeadCell: {
        attributes: {
          className: "whitespace-nowrap",
        },
      },
      customDataCell: {
        attributes: {
          className: "whitespace-nowrap",
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
      truncate: {
        maxWidth: 150,
        showTooltip: true,
      },
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
  sortOption: {
    key: "start_date_utc",
    direction: "desc",
  },
};

export const InnerTable: StoryFn = () => {
  const [expandedRows, setExpandedRows] = React.useState<{ [page: number]: Set<number> }>({});
  const [currentPage, setCurrentPage] = React.useState(1);

  const paginationSnapOptionsRef = React.useRef([
    { id: nanoid(), label: "5 / page", itemsPerPage: 5 },
    { id: nanoid(), label: "10 / page", itemsPerPage: 10 },
    { id: nanoid(), label: "25 / page", itemsPerPage: 25 },
    { id: nanoid(), label: "50 / page", itemsPerPage: 50 },
  ]);

  const toggleRow = (page: number, rowIndex: number) => {
    setExpandedRows((prev) => {
      const pageRows = prev[page] || new Set<number>();
      const newSet = new Set(pageRows);
      if (newSet.has(rowIndex)) {
        newSet.delete(rowIndex);
      } else {
        newSet.add(rowIndex);
      }
      return { ...prev, [page]: newSet };
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full">
      <Table
        columns={[
          {
            key: "start_location_abbreviation",
            label: "Start Location",
            focus: (_, index) => expandedRows[currentPage]?.has(index),
          },
          {
            key: "end_location_abbreviation",
            label: "End Location",
            focus: (_, index) => expandedRows[currentPage]?.has(index),
          },
          {
            key: "movement_time" as any,
            label: "Total Time",
            focus: (_, index) => expandedRows[currentPage]?.has(index),
            customDataCell: {
              render: (item) => {
                const totalMinutes = moment(item.end_time_utc).diff(
                  moment(item.start_time_utc),
                  "minutes",
                );

                const { days, hours, minutes } = extractTimeComponentsFromMinutes(totalMinutes);
                const daysStr = days > 0 ? `${days} days` : "";
                const hoursStr = hours > 0 ? `${hours} hours` : "";
                const minutesStr = minutes > 0 ? ` ${minutes} mins` : "";

                return (
                  <div>
                    {" "}
                    {daysStr} {hoursStr} {minutesStr}
                  </div>
                );
              },
            },
          },
          {
            key: "movement_distance_mi",
            label: "Distance",
            format: (value) => {
              if (typeof value !== "number") return value;
              return value.toFixed(2);
            },
            focus: (_, index) => expandedRows[currentPage]?.has(index),
          },
          {
            key: "fuel_consumed_l",
            label: "Fuel Consumed",
            format: (value) => {
              if (typeof value !== "number") return value;
              return value.toFixed(2);
            },
            focus: (_, index) => expandedRows[currentPage]?.has(index),
          },
          {
            key: "fuel_saved_l",
            label: "Fuel Saved",
            format: (value) => {
              if (typeof value !== "number") return value;
              return value.toFixed(2);
            },
            focus: (_, index) => expandedRows[currentPage]?.has(index),
          },
          {
            key: "toggle_compliances" as any,
            label: "Compliances",
            focus: (_, index) => expandedRows[currentPage]?.has(index),
            customDataCell: {
              render: (item, index) => {
                if (item.compliances.length > 0) {
                  return (
                    <button onClick={() => toggleRow(currentPage, index)}>
                      {expandedRows[currentPage]?.has(index) ? "Hide" : "Show"}
                    </button>
                  );
                }

                return <></>;
              },
            },
          },
          {
            key: "compliances",
            label: "",
            fullRow: true,
            focus: (_, index) => expandedRows[currentPage]?.has(index),
            customDataCell: {
              render: (item, index) => {
                return (
                  <Collapse isOpen={expandedRows[currentPage]?.has(index)}>
                    <div className="p-3">
                      <Table
                        columns={[
                          { key: "start_time_utc", label: "Start Time" },
                          { key: "end_time_utc", label: "End Time" },
                          { key: "start_milepost", label: "Start Milepost" },
                          { key: "end_milepost", label: "End Milepost" },
                          {
                            key: "actual_compliance_distance_mi",
                            label: "Actual Compliance Distance",
                            format: (value) => {
                              if (typeof value !== "number") return value;
                              return value.toFixed(2);
                            },
                          },
                          {
                            key: "possible_compliance_distance_mi",
                            label: "Possible Compliance Distance",
                            format: (value) => {
                              if (typeof value !== "number") return value;
                              return value.toFixed(2);
                            },
                          },
                        ]}
                        data={item.compliances}
                      />
                    </div>
                  </Collapse>
                );
              },
            },
          },
        ]}
        data={MOCK_TRIP_DETAILS.movements}
        pagination={{
          itemsPerPage: 10,
          snapOptions: paginationSnapOptionsRef.current,
        }}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export const WithLoading = Template.bind({});
WithLoading.args = {
  ...Default.args,
  loading: true,
};

export const WithEmptyData = Template.bind({});
WithEmptyData.args = {
  ...Default.args,
  data: [],
};
