import React, { useCallback } from 'react';

import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { TOAST_TYPE } from '@@constants/toastConfig.constant';
import useToast from '@@hooks/useToast';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';

const ErrorScreenInRootStack = ({ error, resetError }: { error: Error; resetError: () => void }) => {
  type walletNavProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<walletNavProps>();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        rootNavigation.navigate(ROOT_STACK_ROUTE.MAIN);
        setTimeout(() => {
          showToast(TOAST_TYPE.ERROR, t('msg_error_occurred_can_not_display'));
        }, 1500);
      }
    }, [isFocused])
  );
  return <View />;
};
export default ErrorScreenInRootStack;
