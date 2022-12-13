import React from 'react';

import { Pressable } from 'react-native';

import * as S from './EarnEventContent.style';

export interface IEarnEventContentProps {
  timeLabel: string;
  avatarUrl: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

/**
 * EarnEventList item components
 * @param timeLabel event time description
 * @param avatarUrl event icon url
 * @param title event title string
 * @param subtitle event subtitle string
 */
export const EarnEventContent = ({ timeLabel, avatarUrl, title, subtitle, onPress }: IEarnEventContentProps) => {
  return (
    <S.Layout>
      <Pressable onPress={onPress}>
        <S.RoundCornerGroup>
          <S.TimeLabelRoundContainer>
            <S.TimeLabel>{timeLabel}</S.TimeLabel>
          </S.TimeLabelRoundContainer>

          <S.ContentsGroup>
            <S.Avatar source={{ uri: avatarUrl }} />
            <S.TextGroup>
              <S.TitleText>{title}</S.TitleText>
              <S.SubTitleText>{subtitle}</S.SubTitleText>
            </S.TextGroup>
          </S.ContentsGroup>
        </S.RoundCornerGroup>
      </Pressable>
    </S.Layout>
  );
};
