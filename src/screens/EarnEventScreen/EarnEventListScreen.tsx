import React, { useCallback } from 'react';

import { ListRenderItemInfo } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';

import { useEarEventList } from '@@hooks/event/useEarnEventList';

import { IEarnEventContentProps, EarnEventContent } from './EarnEventContent';
import * as S from './EarnEventListScreen.style';

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
  //const { isLoading, error, data, refetch } = useEarEventList();

  const renderEarnEventContents = useCallback(
    ({ item }: ListRenderItemInfo<IEarnEventContentProps>) => {
      return <EarnEventContent timeLabel={item.timeLabel} avatarUrl={item.avatarUrl} title={item.title} subtitle={item.subtitle} />;
    },
    //[data]
    []
  );

  return (
    <S.Container>
      <S.TopTitleBar>
        <S.HeaderText>{t('event_screen_title')}</S.HeaderText>
        <S.BetaTag>
          <S.BetaTagText>{t('beta')}</S.BetaTagText>
        </S.BetaTag>
      </S.TopTitleBar>

      <S.BodyContainer>
        <S.EventList data={DATA} renderItem={renderEarnEventContents} estimatedItemSize={2} />
      </S.BodyContainer>
    </S.Container>
  );
};
