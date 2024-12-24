import { addons } from "@storybook/manager-api";
import ecorail from "./ecorail";

addons.setConfig({
  theme: ecorail,
  panelPosition: "right",
});
