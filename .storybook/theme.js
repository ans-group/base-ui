import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  colorPrimary: '#2e104b',
  colorSecondary: '#2e104b',

  // UI
  appBg: 'white',
  // appContentBg: 'silver',
  // appBorderColor: 'grey',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'silver',
  barSelectedColor: 'black',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 0,

  brandTitle: 'ANS Digital Framework',
  brandUrl: 'https://ans.co.uk',
  brandImage: 'https://i.imgur.com/U7Rg4y9.png',
})
