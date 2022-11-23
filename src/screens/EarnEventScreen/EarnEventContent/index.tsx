import React from 'react';

import * as S from './EarnEventContent.style';

export interface IEarnEventContentProps {
  timeLabel: string;
  avatarUrl: string;
  title: string;
  subtitle: string;
}

/**
 * EarnEventList item components
 * @param timeLabel event time description
 * @param avatarUrl event icon url
 * @param title event title string
 * @param subtitle event subtitle string
 */
export const EarnEventContent = ({ timeLabel, avatarUrl, title, subtitle }: IEarnEventContentProps) => {
  return (
    <S.Layout>
      <S.RoundCornerGroup>
        <S.TimeLabelContainer>
          <S.TimeLabel>{timeLabel}</S.TimeLabel>
        </S.TimeLabelContainer>

        <S.ContentsGroup>
          <S.Avatar source={{ uri: avatarUrl }} />
          <S.TextGroup>
            <S.TitleText>{title}</S.TitleText>
            <S.SubTitleText>{subtitle}</S.SubTitleText>
          </S.TextGroup>
        </S.ContentsGroup>
      </S.RoundCornerGroup>
    </S.Layout>
  );
};
