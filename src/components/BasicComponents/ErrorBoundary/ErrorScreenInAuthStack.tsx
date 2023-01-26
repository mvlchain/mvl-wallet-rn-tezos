import React, { useCallback } from 'react';

import { useNavigation, useFocusEffect, useIsFocused, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { TOAST_TYPE } from '@@constants/toastConfig.constant';
import useToast from '@@hooks/useToast';
import { AUTH_STACK_ROUTE, TAuthStackNavigationProps } from '@@navigation/AuthStack/AuthStack.type';

const ErrorScreenInAuthStack = ({ error, resetError }: { error: Error; resetError: () => void }) => {
  type walletNavProps = TAuthStackNavigationProps<'SIGN_IN'>;
  const rootNavigation = useNavigation<walletNavProps>();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        rootNavigation.navigate(AUTH_STACK_ROUTE.SIGN_IN);
        setTimeout(() => {
          showToast(TOAST_TYPE.ERROR, t('msg_error_after_redirection_home'));
        }, 1500);
      }
    }, [isFocused])
  );
  return <View />;
};
export default ErrorScreenInAuthStack;
