import { StyleSheet } from 'react-native';

import { height } from '@@utils/ui';

export const inlineStyles = StyleSheet.create({
  fullScreen: {
    margin: 0,
  },
  notFullScreen: {
    margin: 0,
    paddingTop: 60 * height,
  },
});

export const BackdropColor = {
  light: undefined,
  dark: 'rgba(255,255,255,0.25)',
};
