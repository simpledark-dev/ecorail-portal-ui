import { Meta, StoryFn } from "@storybook/react";
import { FuelSavingsChartWidget, FuelSavingsChartWidgetProps } from "..";
export default {
  title: "Widgets/TrendingMetrics/FuelSavingsChart",
  component: FuelSavingsChartWidget,
} as Meta;
import MOCK_FUEL_SAVINGS_TRENDS from "../mocks/fuel-savings-trends.mock.json";
import React from "react";
import momenttz from "moment-timezone";

const Template: StoryFn<FuelSavingsChartWidgetProps> = (args) => {
  const sortedDataByDate = React.useMemo(() => {
    return MOCK_FUEL_SAVINGS_TRENDS.sort(function (dailyA, dailyB) {
      return momenttz.utc(dailyA.day).diff(momenttz.utc(dailyB.day).toDate());
    });
  }, []);

  const compliances =
    (sortedDataByDate && sortedDataByDate.map((daily: any) => daily.daily_compliance_percent)) ||
    [];

  const fuelSavings =
    (sortedDataByDate && sortedDataByDate.map((daily: any) => daily.daily_fuel_saving_percent)) ||
    [];

  const dates = sortedDataByDate.map((daily) =>
    momenttz.utc(daily.day).tz(momenttz.tz.guess()).toDate(),
  );

  return (
    <>
      <FuelSavingsChartWidget
        {...args}
        dates={dates}
        compliance={{ data: compliances, unit: "%" }}
        fuelSaving={{ data: fuelSavings, unit: "%" }}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithEmpty = () => {
  const sortedDataByDate = React.useMemo(() => {
    return MOCK_FUEL_SAVINGS_TRENDS.sort(function (dailyA, dailyB) {
      return momenttz.utc(dailyA.day).diff(momenttz.utc(dailyB.day).toDate());
    });
  }, []);

  const dates = sortedDataByDate.map((daily) =>
    momenttz.utc(daily.day).tz(momenttz.tz.guess()).toDate(),
  );

  return (
    <FuelSavingsChartWidget
      dates={dates}
      compliance={{ data: [], unit: "%" }}
      fuelSaving={{ data: [], unit: "%" }}
    />
  );
};

export const WithLoading = () => {
  const sortedDataByDate = React.useMemo(() => {
    return MOCK_FUEL_SAVINGS_TRENDS.sort(function (dailyA, dailyB) {
      return momenttz.utc(dailyA.day).diff(momenttz.utc(dailyB.day).toDate());
    });
  }, []);

  const dates = sortedDataByDate.map((daily) =>
    momenttz.utc(daily.day).tz(momenttz.tz.guess()).toDate(),
  );

  return (
    <FuelSavingsChartWidget
      dates={dates}
      compliance={{ data: [], unit: "%" }}
      fuelSaving={{ data: [], unit: "%" }}
      loading={true}
    />
  );
};
