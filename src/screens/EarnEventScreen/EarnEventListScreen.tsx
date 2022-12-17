import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';
import { RefreshControl } from 'react-native';

import { EarnEvent } from '@@domain/model/EarnEvent';
import { useEarnEventList } from '@@hooks/event/useEarnEventList';
import { useRefetchByRefreshControl } from '@@hooks/useRefetchByRefreshControl';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';

import { EarnEventContent } from './EarnEventContent';
import * as S from './EarnEventListScreen.style';
import { EmptyEarnEventContent } from './EmptyEarnEventContent';
/**
 * EarnEventList screen
 *
 *  - get all the active events
 */
export const EarnEventListScreen = () => {
  const { t } = useTranslation();
  const { isLoading, error, data, refetch } = useEarnEventList();
  const { refreshing, refresh } = useRefetchByRefreshControl(refetch);
  const navigation = useNavigation<TRootStackNavigationProps<typeof ROOT_STACK_ROUTE.MAIN>>();

  // callback rendering EarnEventContent (by FlashList)
  const renderEarnEventContents = useCallback(({ item }: ListRenderItemInfo<EarnEvent>) => {
    return (
      <EarnEventContent
        timeLabel={item.timeDescription}
        avatarUrl={item.iconUrl}
        title={item.title}
        subtitle={item.subTitle}
        onPress={() => {
          // onItemClick event
          navigation.navigate(ROOT_STACK_ROUTE.EVENT_DETAILS, { i: item.id, data: item });
        }}
      />
    );
  }, []);

  return (
    <S.Container>
      <S.TopTitleBar>
        <S.HeaderText>{t('event_screen_title')}</S.HeaderText>
        <S.BetaTag>
          <S.BetaTagText>{t('beta')}</S.BetaTagText>
        </S.BetaTag>
      </S.TopTitleBar>

      <S.BodyContainer>
        {(data?.length ?? 0) === 0 && <EmptyEarnEventContent />}
        <S.EventListLayout>
          {data && (
            <FlashList
              data={data}
              extraData={data}
              keyExtractor={(item) => item.id}
              renderItem={renderEarnEventContents}
              estimatedItemSize={data?.length ?? 0}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={refresh}
                  tintColor='transparent'
                  colors={['transparent']}
                  style={S.InlineStyle.flashlist}
                />
              }
            />
          )}
        </S.EventListLayout>
      </S.BodyContainer>
    </S.Container>
  );
};
