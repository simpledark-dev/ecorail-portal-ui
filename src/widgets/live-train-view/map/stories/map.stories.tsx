import { Meta, StoryFn } from "@storybook/react";
import { MOCK_LOCOS_1, MOCK_LOCOS_2 } from "../mocks";
import { MapWidget, MapWidgetProps } from "..";

export default {
  title: "Widgets/LiveTrainView/Map",
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
  locos: MOCK_LOCOS_1,
};

export const Cluster = Template.bind({});
Cluster.args = {
  locos: MOCK_LOCOS_2,
};

export const WithLoading = Template.bind({});
WithLoading.args = {
  locos: MOCK_LOCOS_1,
  loading: true,
};
