import { Table, TableProps } from "..";
import { StoryFn } from "@storybook/react";

export default {
  title: "Components/Table",
  component: Table,
};

const Template: StoryFn<TableProps> = (args) => {
  return <Table {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  columns: [
    {
      key: "start-date",
      label: "Start date",
      renderCell: (item) => {
        return <></>;
      },
    },
    {
      key: "end-date",
      label: "End date",
      renderCell: (item) => {
        return <></>;
      },
    },
    {
      key: "start-end-station",
      label: "Start → End",
      renderCell: (item) => {
        return <></>;
      },
    },
  ],
};
