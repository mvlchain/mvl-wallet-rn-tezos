import Toast, { ToastShowParams } from 'react-native-toast-message';

import TOAST_DEFAULT_OPTION, { TToastType } from '@@constants/toastConfig.constant';

const useToast = () => {
  const showToast = (type: TToastType, text: string, opt?: ToastShowParams) => {
    Toast.show({
      ...TOAST_DEFAULT_OPTION,
      ...opt,
      type: type,
      text1: text,
    });
  };

  return {
    showToast,
  };
};

export default useToast;
