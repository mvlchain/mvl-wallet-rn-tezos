import { DefaultTheme } from 'react-native-paper';

import { fontSize } from '@@utils/ui';

declare global {
  namespace ReactNativePaper {
    interface Theme extends ThemeOverride {}
  }
}

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0089e7',
    primaryDarkest: '#000E17',
    primaryLightest: '#e6f3fd',
    red: '#ff3f3f',
    yellow: '#ffc400',
    navy: '#082e3d',
    green: '#00d254',
    white: '#ffffff',
    black: '#000000',
    grey: {
      100: '#e6e6e6',
      200: '#cccccc',
      300: '#b3b3b3',
      400: '#999999',
      500: '#808080',
      600: '#666666',
      700: '#4d4d4d',
      800: '#333333',
      900: '#1a1a1a',
    },
  },
  font: {
    Paragraph: {
      md: {
        color: '#000',
        fontSize: fontSize(16),
        lineHeight: 24,
      },
      lg: {
        color: '#000',
        fontSize: fontSize(18),
        lineHeight: 28,
      },
    },
    Label: {
      sm: {
        color: '#000',
        fontSize: fontSize(14),
        lineHeight: 16,
      },
      md: {
        color: '#000',
        fontSize: fontSize(16),
        lineHeight: 20,
      },
      lg: {
        color: '#000',
        fontSize: fontSize(18),
        lineHeight: 24,
      },
    },
    Title: {
      xs: {
        color: '#000',
        fontSize: fontSize(20),
        lineHeight: 28,
        fontWeight: '800',
      },
      sm: {
        color: '#000',
        fontSize: fontSize(24),
        lineHeight: 32,
        fontWeight: '800',
      },
      md: {
        color: '#000',
        fontSize: fontSize(28),
        lineHeight: 36,
        fontWeight: '800',
      },
      lg: {
        color: '#000',
        fontSize: fontSize(32),
        lineHeight: 40,
        fontWeight: '800',
      },
    },
  },
} as const;

export type ThemeOverride = typeof theme;
