import React from 'react';

import { useTokenBalance } from '@@hooks/useTokenBalance';

import * as S from './TokenList.style';
import TokenListItem from './TokenListItem';

function TokenList() {
  const { formalizedBalance } = useTokenBalance();
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>Token</S.Title>
      </S.TitleContainer>
      <S.TokenFlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TokenListItem {...item} />}
        data={formalizedBalance}
        extraData={formalizedBalance}
        keyExtractor={(data) => `token_${data?.ticker}`}
      />
    </S.Container>
  );
}

export default TokenList;
