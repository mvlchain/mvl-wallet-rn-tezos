import React from 'react';

import { View } from 'react-native';

import { useTokenBalanceList } from '@@hooks/useTokenBalanceList';

import * as S from './TokenList.style';
import TokenListItem from './TokenListItem';

function TokenList() {
  const tokenList = useTokenBalanceList();

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>Token</S.Title>
      </S.TitleContainer>
      <View>
        {tokenList.map((props: any) => (
          <TokenListItem {...props} key={'token' + props.name} />
        ))}
      </View>
    </S.Container>
  );
}

export default TokenList;
