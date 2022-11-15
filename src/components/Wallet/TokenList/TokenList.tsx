import React from 'react';

import { useTokenBalanceList } from '@@hooks/useTokenBalanceList';

import * as S from './TokenList.style';
import TokenListItem from './TokenListItem';

function TokenList() {
  const { balanceData } = useTokenBalanceList();
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>Token</S.Title>
      </S.TitleContainer>
      <S.TokenFlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TokenListItem {...item} />}
        data={balanceData}
        extraData={balanceData}
        keyExtractor={(data) => `token_${data?.asset?.ticker}`}
      />
    </S.Container>
  );
}

export default TokenList;
