import type { Meta, StoryFn } from "@storybook/react";
import { Collapse } from "..";
import { useState } from "react";

export default {
  title: "Elements/Collapse",
  component: Collapse,
} as Meta;

export const Basic: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[400px] space-y-4">
      <button
        className="rounded-md bg-blue-500 px-4 py-2 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        Toggle
      </button>

      <Collapse isOpen={isOpen}>
        <div className="rounded-md border border-gray-200 bg-white p-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates, quod,
            quia, voluptate quae voluptatem quibusdam quos voluptatum quidem quas nesciunt.
            Quisquam, quae. Quisquam voluptates, quod, quia, voluptate quae voluptatem quibusdam
            quos voluptatum quidem quas nesciunt. Quisquam, quae.
          </p>
        </div>
      </Collapse>
    </div>
  );
};

export const WithCustomClass: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[400px] space-y-4">
      <button
        className="rounded-md bg-blue-500 px-4 py-2 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        Toggle
      </button>

      <Collapse isOpen={isOpen} className="rounded-md bg-gray-100">
        <div className="p-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates, quod,
            quia, voluptate quae voluptatem quibusdam quos voluptatum quidem quas nesciunt.
            Quisquam, quae. Quisquam voluptates, quod, quia, voluptate quae voluptatem quibusdam
            quos voluptatum quidem quas nesciunt. Quisquam, quae.
          </p>
        </div>
      </Collapse>
    </div>
  );
};
