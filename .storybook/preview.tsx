import React from "react";
import ecorail from "./ecorail";
import { BrowserRouter } from "react-router-dom";
import "../src/assets/global.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    theme: ecorail,
  },
  backgrounds: {
    values: [{ name: "Light", value: "#e6e8e9" }],
    default: "Light",
  },
};

export const globalTypes = {};

export const decorators = [
  (Story, context) => {
    return (
      <BrowserRouter>
        <main className="h-full w-full font-inter antialiased">
          <Story />
        </main>
      </BrowserRouter>
    );
  },
];
