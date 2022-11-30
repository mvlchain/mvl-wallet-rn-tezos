import React from 'react';

import { useTranslation } from 'react-i18next';

import { EmptyEvent } from '@@assets/image';

import * as S from './EmptyEarnEventContent.style';

/**
 * EarnEventList empty contents
 */
export const EmptyEarnEventContent = () => {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.VerticalLayout>
        <EmptyEvent width='100%' />
        <S.EmptyDescriptionText>{t('event_empty')}</S.EmptyDescriptionText>
      </S.VerticalLayout>
    </S.Container>
  );
};
