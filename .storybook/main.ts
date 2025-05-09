export default {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react-vite",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  staticDirs: ["./public"],
};
