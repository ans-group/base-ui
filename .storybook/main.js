module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-backgrounds/register',
    '@storybook/addon-knobs/register',
    'storybook-addon-jsx/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
};
