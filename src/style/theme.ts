import { fontSize } from '@@utils/ui';

const common = {
  font: {
    Paragraph: {
      md: {
        color: '#000',
        'font-size': `${fontSize(16)}px`,
        'line-height': 16,
        'font-family': 'AppleSDGothicNeoM00',
        'font-weight': '400',
      },
      lg: {
        color: '#000',
        'font-size': `${fontSize(18)}px`,
        'line-height': 18,
        'font-family': 'AppleSDGothicNeoM00',
        'font-weight': '400',
      },
    },
    Label: {
      sm: {
        color: '#000',
        'font-size': `${fontSize(14)}px`,
        'line-height': 14,
        'font-family': 'AppleSDGothicNeoB00',
        'font-weight': '500',
      },
      md: {
        color: '#000',
        'font-size': `${fontSize(16)}px`,
        'line-height': 16,
        'font-family': 'AppleSDGothicNeoB00',
        'font-weight': '500',
      },
      lg: {
        color: '#000',
        'font-size': `${fontSize(18)}px`,
        'line-height': 18,
        'font-family': 'AppleSDGothicNeoB00',
        'font-weight': '500',
      },
    },
    Title: {
      xs: {
        color: '#000',
        'font-size': `${fontSize(20)}px`,
        'line-height': 20,
        'font-family': 'AppleSDGothicNeoH00',
        'font-weight': '800',
      },
      sm: {
        color: '#000',
        'font-size': `${fontSize(24)}px`,
        'line-height': 24,
        'font-family': 'AppleSDGothicNeoH00',
        'font-weight': '800',
      },
      md: {
        color: '#000',
        'font-size': `${fontSize(28)}px`,
        'line-height': 28,
        'font-family': 'AppleSDGothicNeoH00',
        'font-weight': '800',
      },
      lg: {
        color: '#000',
        'font-size': `${fontSize(32)}px`,
        'line-height': 32,
        'font-family': 'AppleSDGothicNeoH00',
        'font-weight': '800',
      },
    },
  },
  fmThin: 'AppleSDGothicNeoT00',
  fmULight: 'AppleSDGothicNeoUL00',
  fmLight: 'AppleSDGothicNeoL00',
  fmRegular: 'AppleSDGothicNeoR00',
  fmMedium: 'AppleSDGothicNeoM00',
  fmBold: 'AppleSDGothicNeoB00',
  fmSBold: 'AppleSDGothicNeoSB00',
  fmExBold: 'AppleSDGothicNeoEB00',
  fmHeavey: 'AppleSDGothicNeoH00',

  // common font color
  cfc01: '#ffffff',
  cfc02: '#808080',
  cfc03: '#FF3F3F',

  // common backgrond color
  cbg01: '#0089E7',
  cbg02: '#FFC400',
  cbg03: '#E6E6E6',
  cbg04: '#CCE7FA',
  cbg05: '#ffffff',

  // common line color
  clc01: '#0089E7',
  clc02: '#FF3F3F',
};

const lightColors = {
  // font color
  fc01: '#000000',
  fc02: '#ffffff',
  fc03: '#0089E7',

  // background color
  bg01: '#ffffff',
  bg02: '#E6E6E6',
  bg03: '#CCE7FA',
  bg04: '#333333',

  // line color
  lc01: '#0089E7',
  lc02: '#E6E6E6',
};

const darkColors = {
  // font color
  fc01: '#ffffff',
  fc02: '#000000',
  fc03: '#0089E7',

  // background color
  bg01: '#000000',
  bg02: '#1A1A1A',
  bg03: '#001B2E',
  bg04: '#CCCCCC',

  // line color
  lc01: '#0089E7',
  lc02: '#1A1A1A',
};

export const dark = {
  color: darkColors,
  ...common,
};

export const light = {
  color: lightColors,
  ...common,
};

export const theme = {
  dark,
  light,
};

export type Theme = typeof theme.dark & typeof theme.light;
