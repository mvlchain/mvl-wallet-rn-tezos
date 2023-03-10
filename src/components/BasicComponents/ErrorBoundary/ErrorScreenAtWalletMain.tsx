import React, { useCallback } from 'react';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { TOAST_TYPE } from '@@constants/toastConfig.constant';
import useToast from '@@hooks/useToast';

const ErrorScreenAtWalletMain = ({ error, resetError }: { error: Error; resetError: () => void }) => {
  const { showToast } = useToast();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        showToast(TOAST_TYPE.ERROR, t('msg_error_occurred_can_not_display'));
      }
    }, [isFocused])
  );
  return <View />;
};
export default ErrorScreenAtWalletMain;
