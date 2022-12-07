import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { fontStyle } from '@@style/theme';
import { width, height, fontSize } from '@@utils/ui';

export const style = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 32,
  },
  pointAmount: {
    ...fontStyle.title.xs,
    lineHeight: height * 28,
  },
  pointUnit: {
    ...fontStyle.label.md,
    lineHeight: height * 20,
  },
  extensionArrow: {
    marginLeft: width * 16,
  },
});

export const Container = styled.View`
  border-top-left-radius: ${width * 16}px;
  border-top-right-radius: ${width * 16}px;
  padding: ${width * 24}px;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const RewardBoard = styled.Pressable`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: ${height * 24}px;
`;

export const Avatar = styled.Image`
  width: ${width * 40}px;
  height: ${width * 40}px;
`;

export const PointGroupLayout = styled.View`
  flex: 1;
  margin-left: ${width * 16}px;
`;

export const PointCategoryWrapper = styled.View`
  margin-bottom: ${height * 4}px;
`;
export const PointCategoryText = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-weight: 800;
  line-height: ${height * 20}px;
  color: ${({ theme }) => theme.color.grey500};
`;

export const TxFeeLayout = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: ${height * 24}px;
`;

export const TxFeeLabel = styled.Text`
  flex: 1;
  ${({ theme }) => theme.font.Label.sm};
  line-height: ${height * 16}px;
  color: ${({ theme }) => theme.color.grey500};
  margin-left: ${width * 8}px;
  margin-top: ${height * 2}px;
  margin-bottom: ${height * 2}px;
`;
