const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // should be the same paths as in tsconfig.paths.json and craco.config.js
      assets: path.resolve(__dirname, '../assets'),
      utils: path.resolve(__dirname, '../utils'),
      types: path.resolve(__dirname, '../types'),
      pages: path.resolve(__dirname, '../pages'),
      atoms: path.resolve(__dirname, '../components/atoms'),
      molecules: path.resolve(__dirname, '../components/molecules'),
      organisms: path.resolve(__dirname, '../components/organisms'),
      templates: path.resolve(__dirname, '../components/templates'),
      contexts: path.resolve(__dirname, '../components/contexts'),
      services: path.resolve(__dirname, '../components/services'),
    };

    return config;
  },
};
