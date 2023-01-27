import React, { useCallback } from 'react';

import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';

import { DappImage } from '@@assets/image';
import Device from '@@utils/device';

import * as S from './BrowserMainScreen.style';
import { IBrowserMainScreenProps } from './BrowserMainScreen.type';
import DappListItem from './DappListItem';
import { IDappListItemProps } from './DappListItem/DappListItem.type';
import useBrowserMainScreen from './useBrowserMainScreen';

function BrowserMainScreen(props: IBrowserMainScreenProps) {
  const { t } = useTranslation();
  const { dappList, onPressSearchBtn } = useBrowserMainScreen();

  const renderDappItem = useCallback(({ item }: ListRenderItemInfo<IDappListItemProps>) => {
    return <DappListItem Image={item.Image} title={item.title} description={item.description} onPress={item.onPress} />;
  }, []);

  // const browserHintKey = Device.isAndroid() ? 'd_app_search_hint' : 'd_app_search_hint_ios';
  const browserHintKey = 'd_app_hint';
  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>{t('browser')}</S.HeaderTitle>
      </S.Header>
      <S.SearchContainer>
        <S.SearchBtn onPress={onPressSearchBtn}>
          <S.SearchText>{t(browserHintKey)}</S.SearchText>
        </S.SearchBtn>
      </S.SearchContainer>
      <S.ContentContainer>
        <DappImage />
      </S.ContentContainer>
      {/* <S.ContentContainer isIOS={Device.isIos()}>
        {Device.isAndroid() ? (
          <FlashList
            data={dappList}
            extraData={dappList}
            keyExtractor={(item) => item.title}
            renderItem={renderDappItem}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={dappList?.length ?? 0}
          />
        ) : (
          <DappImage />
        )}
      </S.ContentContainer> */}
    </S.Container>
  );
}

export default BrowserMainScreen;
