import { Meta, StoryFn } from "@storybook/react";
import { FuelUsedChartWidget, FuelUsedChartWidgetProps } from "..";
export default {
  title: "Widgets/TrendingMetrics/FuelUsedChart",
  component: FuelUsedChartWidget,
} as Meta;
import MOCK_FUEL_SAVINGS_TRENDS from "../mocks/fuel-savings-trends.mock.json";
import React from "react";
import momenttz from "moment-timezone";

const Template: StoryFn<FuelUsedChartWidgetProps> = (args) => {
  const sortedDataByDate = React.useMemo(() => {
    return MOCK_FUEL_SAVINGS_TRENDS.sort(function (dailyA, dailyB) {
      return momenttz.utc(dailyA.day).diff(momenttz.utc(dailyB.day).toDate());
    });
  }, []);

  const fuelConsumptions =
    (sortedDataByDate &&
      sortedDataByDate.map((daily: any) => daily.daily_fuel_consumed_litres || 0)) ||
    [];

  const estimatedFuelConsumptions =
    (sortedDataByDate &&
      sortedDataByDate.map((daily: any) => daily.daily_estimated_fuel_consumed_litres || 0)) ||
    [];

  const distanceTraveled =
    (sortedDataByDate &&
      sortedDataByDate.map((daily: any) => daily.daily_distance_travelled_miles || 0)) ||
    [];

  const dates = sortedDataByDate.map((daily) =>
    momenttz.utc(daily.day).tz(momenttz.tz.guess()).toDate(),
  );

  return (
    <>
      <FuelUsedChartWidget
        {...args}
        dates={dates}
        fuelConsumption={{ data: fuelConsumptions, unit: "litres" }}
        estimatedFuelConsumption={{ data: estimatedFuelConsumptions, unit: "litres" }}
        distanceTraveled={{ data: distanceTraveled, unit: "Miles" }}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
