import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';

import { TOAST_TYPE } from '@@constants/toastConfig.constant';
import useToast from '@@hooks/useToast';

const ErrorScreenEmpty = ({ error, resetError }: { error: Error; resetError: () => void }) => {
  useEffect(() => {
    Alert.alert('Error', 'error has occurred');
  }, []);

  return <View />;
};
export default ErrorScreenEmpty;
