import React, { useCallback } from 'react';

import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';

import { DappImage, NFTImage, BridgeImage } from '@@assets/image';
import Device from '@@utils/device';

import * as S from './BrowserMainScreen.style';
import { IBrowserMainScreenProps } from './BrowserMainScreen.type';
import DappListItem from './DappListItem';
import { IDappListItemProps } from './DappListItem/DappListItem.type';
import useBrowserMainScreen from './useBrowserMainScreen';

function BrowserMainScreen(props: IBrowserMainScreenProps) {
  const { t } = useTranslation();
  const { onPressSearchBtn } = useBrowserMainScreen();

  const data = [
    {
      Image: BridgeImage,
      title: 'MVL NFT',
      description: 'MVL NFTs are minted on Binance Smart Chain, which are connected to vehicles...',
      onPress: () => {},
    },
    { Image: NFTImage, title: 'MVL Bridge', description: 'MVL Bridge helps users to exchange between MVL ERC-20 and MVL BEP-20.', onPress: () => {} },
  ];

  const renderDappItem = useCallback(({ item }: ListRenderItemInfo<IDappListItemProps>) => {
    return (
      <DappListItem
        Image={item.Image}
        title={item.title}
        description={item.description}
        onPress={() => {
          // onItemClick event
          // navigation.navigate(ROOT_STACK_ROUTE.EVENT_DETAILS, { i: item.id, data: item });
        }}
      />
    );
  }, []);
  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>{t('browser')}</S.HeaderTitle>
      </S.Header>
      <S.SearchContainer>
        <S.SearchBtn onPress={onPressSearchBtn}>
          <S.SearchText>{t(Device.isAndroid() ? 'd_app_search_hint' : 'd_app_search_hint_ios')}</S.SearchText>
        </S.SearchBtn>
      </S.SearchContainer>
      <S.ContentContainer isIOS={Device.isIos()}>
        {Device.isAndroid() ? (
          <FlashList
            data={data}
            extraData={data}
            keyExtractor={(item) => item.title}
            renderItem={renderDappItem}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={data.length ?? 0}
          />
        ) : (
          <DappImage />
        )}
      </S.ContentContainer>
    </S.Container>
  );
}

export default BrowserMainScreen;
