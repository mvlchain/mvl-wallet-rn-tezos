import React from 'react';

import { Pressable } from 'react-native';

import Picture from '@@components/BasicComponents/Picture';
import { getHeight, getWidth } from '@@utils/ui';

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
  console.log(`Image> ${avatarUrl}`);
  return (
    <S.Layout>
      <Pressable onPress={onPress}>
        <S.RoundCornerGroup>
          <S.TimeLabelRoundContainer>
            <S.TimeLabel>{timeLabel}</S.TimeLabel>
          </S.TimeLabelRoundContainer>

          <S.ContentsGroup>
            <Picture url={avatarUrl} width={getWidth(40)} height={getHeight(40)} />
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
