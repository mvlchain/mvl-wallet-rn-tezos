import React, { useCallback } from 'react';

import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';

import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import Device from '@@utils/device';

import BrowserSearchHistoryItem from './BrowserSearchHistoryItem';
import { IBrowserSearchHistoryItemProps } from './BrowserSearchHistoryItem/BrowserSearchHistoryItem.type';
import * as S from './BrowserSearchScreen.style';
import { IBrowserSearchScreenProps } from './BrowserSearchScreen.type';
import useBrowserSearchScreen from './useBrowserSearchScreen';

function BrowserSearchScreen(props: IBrowserSearchScreenProps) {
  const { t } = useTranslation();
  const { filteredHistory, searchValue, setSearchValue, setIsInputFocused, onPressSearch, onPressCancel } = useBrowserSearchScreen();
  const renderDappItem = useCallback(({ item }: ListRenderItemInfo<IBrowserSearchHistoryItemProps>) => {
    return (
      <BrowserSearchHistoryItem
        title={item.title}
        link={item.link}
        onPress={item.onPress}
        onPressDelete={item.onPressDelete}
        isFocused={item.isFocused}
      />
    );
  }, []);

  return (
    <S.Container>
      <S.SearchContainer>
        <S.SearchInput
          value={searchValue}
          onChangeText={setSearchValue}
          onSubmitEditing={onPressSearch}
          onFocus={() => {
            setIsInputFocused(true);
          }}
          onBlur={() => {
            setIsInputFocused(false);
          }}
          placeholder={t(Device.isAndroid() ? 'd_app_search_hint' : 'd_app_search_hint_ios')}
          returnKeyType='search'
        />
        <TextButton label={t('cancel')} disabled={false} onPress={onPressCancel} />
      </S.SearchContainer>
      <S.ContentContainer>
        <S.History>{t('history')}</S.History>
      </S.ContentContainer>
      <FlashList
        data={filteredHistory}
        extraData={filteredHistory}
        keyExtractor={(item) => item.link}
        renderItem={renderDappItem}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={filteredHistory.length ?? 0}
      />
    </S.Container>
  );
}

export default BrowserSearchScreen;
