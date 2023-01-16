import React, { useCallback } from 'react';

import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput } from 'react-native';

import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import Device from '@@utils/device';

import BrowserSearchHistoryItem from './BrowserSearchHistoryItem';
import { IBrowserSearchHistoryItemProps } from './BrowserSearchHistoryItem/BrowserSearchHistoryItem.type';
import * as S from './BrowserSearchScreen.style';
import { IBrowserSearchScreenProps } from './BrowserSearchScreen.type';
import useBrowserSearchScreen from './useBrowserSearchScreen';

function BrowserSearchScreen(props: IBrowserSearchScreenProps) {
  const { t } = useTranslation();
  const { data, isInputFocused, setIsInputFocused } = useBrowserSearchScreen();
  const renderDappItem = useCallback(({ item }: ListRenderItemInfo<IBrowserSearchHistoryItemProps>) => {
    return (
      <BrowserSearchHistoryItem
        title={item.title}
        link={item.link}
        onPress={() => console.log('open modal')}
        onPressDelete={() => console.log('deelte')}
        isFocused={item.isFocused}
      />
    );
  }, []);
  return (
    <S.Container>
      <S.SearchContainer>
        <S.SearchInput
          onFocus={() => {
            setIsInputFocused(true);
          }}
          onBlur={() => {
            setIsInputFocused(false);
          }}
          placeholder={t(Device.isAndroid() ? 'd_app_search_hint' : 'd_app_search_hint_ios')}
        />
        <TextButton label={t('cancel')} disabled={false} onPress={() => console.log('cancel')} />
      </S.SearchContainer>
      <S.ContentContainer>
        <S.History>{t('history')}</S.History>
      </S.ContentContainer>
      <FlashList
        data={data}
        extraData={data}
        keyExtractor={(item) => item.title}
        renderItem={renderDappItem}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={data.length ?? 0}
      />
    </S.Container>
  );
}

export default BrowserSearchScreen;
