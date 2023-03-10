import { StyleSheet } from 'react-native';

import { fontSize } from '@@utils/ui';

import { commonColors, lightColors, darkColors } from './colors';

const commonFont = {
  Paragraph: {
    md: {
      color: '#000',
      'font-size': `${fontSize(16)}px`,
      'font-family': 'AppleSDGothicNeoM00',
      'font-weight': '400',
    },
    lg: {
      color: '#000',
      'font-size': `${fontSize(18)}px`,
      'font-family': 'AppleSDGothicNeoM00',
      'font-weight': '400',
    },
  },
  Label: {
    sm: {
      color: '#000',
      'font-size': `${fontSize(14)}px`,
      'font-family': 'AppleSDGothicNeoB00',
      'font-weight': '500',
    },
    md: {
      color: '#000',
      'font-size': `${fontSize(16)}px`,
      'font-family': 'AppleSDGothicNeoB00',
      'font-weight': '500',
    },
    lg: {
      color: '#000',
      'font-size': `${fontSize(18)}px`,
      'font-family': 'AppleSDGothicNeoB00',
      'font-weight': '500',
    },
  },
  Title: {
    xs: {
      color: '#000',
      'font-size': `${fontSize(20)}px`,
      'font-family': 'AppleSDGothicNeoH00',
      'font-weight': '800',
    },
    sm: {
      color: '#000',
      'font-size': `${fontSize(24)}px`,
      'font-family': 'AppleSDGothicNeoH00',
      'font-weight': '800',
    },
    md: {
      color: '#000',
      'font-size': `${fontSize(28)}px`,
      'font-family': 'AppleSDGothicNeoH00',
      'font-weight': '800',
    },
    lg: {
      color: '#000',
      'font-size': `${fontSize(32)}px`,
      'font-family': 'AppleSDGothicNeoH00',
      'font-weight': '800',
    },
  },
  BetaTag: {
    color: '#000',
    'font-size': `${fontSize(10)}px`,
    'font-family': 'AppleSDGothicNeoH00',
    'font-weight': '700',
  },
};
const commonFontFamily = {
  fmThin: 'AppleSDGothicNeoT00',
  fmULight: 'AppleSDGothicNeoUL00',
  fmLight: 'AppleSDGothicNeoL00',
  fmRegular: 'AppleSDGothicNeoR00',
  fmMedium: 'AppleSDGothicNeoM00',
  fmBold: 'AppleSDGothicNeoB00',
  fmSBold: 'AppleSDGothicNeoSB00',
  fmExBold: 'AppleSDGothicNeoEB00',
  fmHeavey: 'AppleSDGothicNeoH00',
};

export const common = {
  font: commonFont,
  ...commonFontFamily,
};

export const dark = {
  color: { ...commonColors, ...darkColors },
  ...common,
};

export const light = {
  color: { ...commonColors, ...lightColors },
  ...common,
};

export const theme = {
  dark,
  light,
};

export type Theme = typeof theme.dark & typeof theme.light;
export type CommonColor = keyof typeof commonColors;
export type ThemeColor = keyof typeof lightColors & keyof typeof darkColors;

/**
 * StyleSheet fonts
 */

const paragraphFontStyle = StyleSheet.create({
  md: {
    color: '#000',
    fontSize: fontSize(16),
    fontFamily: 'AppleSDGothicNeoM00',
    fontWeight: '400',
  },
  lg: {
    color: '#000',
    fontSize: fontSize(18),
    fontFamily: 'AppleSDGothicNeoM00',
    fontWeight: '400',
  },
});

const labelFontStyle = StyleSheet.create({
  sm: {
    color: '#000',
    fontSize: fontSize(14),
    fontFamily: 'AppleSDGothicNeoB00',
    fontWeight: '500',
  },
  md: {
    color: '#000',
    fontSize: fontSize(16),
    fontFamily: 'AppleSDGothicNeoB00',
    fontWeight: '500',
  },
  lg: {
    color: '#000',
    fontSize: fontSize(18),
    fontFamily: 'AppleSDGothicNeoB00',
    fontWeight: '500',
  },
});

const titleFontStyle = StyleSheet.create({
  xs: {
    color: '#000',
    fontSize: fontSize(20),
    fontFamily: 'AppleSDGothicNeoH00',
    fontWeight: '800',
  },
  sm: {
    color: '#000',
    fontSize: fontSize(24),
    fontFamily: 'AppleSDGothicNeoH00',
    fontWeight: '800',
  },
  md: {
    color: '#000',
    fontSize: fontSize(28),
    fontFamily: 'AppleSDGothicNeoH00',
    fontWeight: '800',
  },
  lg: {
    color: '#000',
    fontSize: fontSize(32),
    fontFamily: 'AppleSDGothicNeoH00',
    fontWeight: '800',
  },
});

export const fontStyle = {
  paragraph: paragraphFontStyle,
  label: labelFontStyle,
  title: titleFontStyle,
};
