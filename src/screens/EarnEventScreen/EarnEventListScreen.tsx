import React, { useCallback } from 'react';

import { AnimatedFlashList, FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';
import { RefreshControl } from 'react-native';

import { EarnEvent } from '@@domain/model/EarnEvent';
import { useEarnEventList } from '@@hooks/event/useEarnEventList';
import { useRefetchByRefreshControl } from '@@hooks/useRefetchByRefreshControl';

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

  // callback rendering EarnEventContent (by FlashList)
  const renderEarnEventContents = useCallback(({ item }: ListRenderItemInfo<EarnEvent>) => {
    return <EarnEventContent timeLabel={item.timeDescription} avatarUrl={item.iconUrl} title={item.title} subtitle={item.subTitle} />;
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
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
            />
          )}
        </S.EventListLayout>
      </S.BodyContainer>
    </S.Container>
  );
};
