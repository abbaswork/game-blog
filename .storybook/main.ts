import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        "@/*": path.resolve(__dirname, "../src/*"),
        // Add "types": path.resolve(__dirname, "../src/types"),
      };
    }
    console.log('config.resolve: ', config.resolve);
    return config;
  },
};

export default config;