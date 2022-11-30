import React, { useCallback } from 'react';

import { AnimatedFlashList, FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';
import { RefreshControl } from 'react-native';

import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { useRefetchByRefreshControl } from '@@hooks/common/useRefetchByRefreshControl';
import { useEarnEventList } from '@@hooks/event/useEarnEventList';

import { IEarnEventContentProps, EarnEventContent } from './EarnEventContent';
import * as S from './EarnEventListScreen.style';
import { EmptyEarnEventContent } from './EmptyEarnEventContent';

const DATA: IEarnEventContentProps[] = [
  {
    timeLabel: '40 min left until the start',
    avatarUrl: 'https://reactjs.org/logo-og.png',
    title: 'First title 1 First title 1 First title 1 First title 1 First title 1 First title 1 First title 1 First title 1 ',
    subtitle: 'First subtitle 1',
  },
  {
    timeLabel: '40 min left until the start',
    avatarUrl: 'https://reactjs.org/logo-og.png',
    title: 'First title 2',
    subtitle: 'First subtitle 2',
  },
];

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
  const renderEarnEventContents = useCallback(({ item }: ListRenderItemInfo<EarnEventDto>) => {
    return <EarnEventContent timeLabel={'40 min left until the start'} avatarUrl={item.iconUrl} title={item.title} subtitle={item.subTitle} />;
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
        {data?.length === 0 && <EmptyEarnEventContent />}

        <S.EventListLayout>
          <FlashList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderEarnEventContents}
            estimatedItemSize={data?.length ?? 0}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
          />
        </S.EventListLayout>
      </S.BodyContainer>
    </S.Container>
  );
};
