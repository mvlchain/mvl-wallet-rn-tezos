import React, { useCallback } from 'react';

import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { TOAST_TYPE } from '@@constants/toastConfig.constant';
import useToast from '@@hooks/useToast';
import { MainTabNavigationProps, MAIN_TAB_ROUTE } from '@@navigation/MainTab/MainTab.type';

const ErrorScreenInMainTab = ({ error, resetError }: { error: Error; resetError: () => void }) => {
  type walletNavProps = MainTabNavigationProps<'WALLET'>;
  const rootNavigation = useNavigation<walletNavProps>();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        rootNavigation.navigate(MAIN_TAB_ROUTE.WALLET);
        setTimeout(() => {
          showToast(TOAST_TYPE.ERROR, t('msg_error_after_redirection_home'));
        }, 1500);
      }
    }, [isFocused])
  );
  return <View />;
};
export default ErrorScreenInMainTab;
