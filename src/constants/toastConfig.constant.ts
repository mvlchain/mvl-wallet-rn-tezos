import { Platform } from 'react-native';
import { ToastShowParams } from 'react-native-toast-message';

const TOAST_DEFAULT_OPTION: ToastShowParams = {
  topOffset: Platform.OS === 'ios' ? 40 : 20,
  visibilityTime: 3500,
};

export default TOAST_DEFAULT_OPTION;
