import React from 'react';

import { View, Text } from 'react-native';

import { useTokenBalanceList } from '@@hooks/useTokenBalanceList';

import * as S from './TokenList.style';
import { ITokenListProps } from './TokenList.type';
import TokenListItem from './TokenListItem';

function TokenList(props: ITokenListProps) {
  const tokenList = useTokenBalanceList();

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>Token</S.Title>
      </S.TitleContainer>
      <View>
        {tokenList.map((props: any) => (
          <TokenListItem {...props} />
        ))}
      </View>
    </S.Container>
  );
}

export default TokenList;
