import { Platform } from 'react-native';
import { ToastShowParams } from 'react-native-toast-message';

import { valueOf } from '@@utils/types';

const TOAST_DEFAULT_OPTION: ToastShowParams = {
  topOffset: Platform.OS === 'ios' ? 40 : 20,
  visibilityTime: 3500,
};

export default TOAST_DEFAULT_OPTION;

export const TOAST_TYPE = {
  BASIC: 'basic',
  ERROR: 'error',
} as const;

export type TToastType = valueOf<typeof TOAST_TYPE>;
