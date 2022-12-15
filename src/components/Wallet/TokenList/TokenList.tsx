import React from 'react';

import { RefreshControl } from 'react-native';

import { useTokenBalance } from '@@hooks/useTokenBalance';

import * as S from './TokenList.style';
import TokenListItem from './TokenListItem';

function TokenList() {
  const { formalizedBalance, getBalance } = useTokenBalance();
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>Token</S.Title>
      </S.TitleContainer>
      <S.TokenFlatList
        refreshControl={
          <RefreshControl
            onRefresh={async () => getBalance()}
            refreshing={false}
            tintColor='transparent'
            colors={['transparent']}
            style={S.InlineStyle.flatlist}
          />
        }
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
