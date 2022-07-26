import { ReactNode } from 'react';
import { DefaultTheme, Provider } from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      primary: string;
      primaryDarkest: string;
      primaryLightest: string;
      red: string;
      yellow: string;
      navy: string;
      green: string;
      white: string;
      black: string;
    }
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
  },
};

function PaperProvider({ children }: { children: ReactNode }) {
  return <Provider theme={theme}>{children}</Provider>;
}

export default PaperProvider;
