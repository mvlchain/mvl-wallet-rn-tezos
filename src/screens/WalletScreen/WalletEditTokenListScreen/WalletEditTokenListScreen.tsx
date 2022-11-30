import React, { useState } from 'react';

import { TouchableOpacity } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

import EditTokenListItem from '@@components/Wallet/EditTokenListItem';
import { WALLET_TOKEN } from '@@constants/token.constant';

import * as S from './WalletEditTokenListScreen.style';

function WalletEditTokenListScreen() {
  const renderItem = ({ item, drag }: any) => {
    return (
      <TouchableOpacity onPressIn={drag}>
        <EditTokenListItem tokenName={item.tokenName} />
      </TouchableOpacity>
    );
  };
  // TODO: 실제 데이터 연동하기
  const [data, setData] = useState([
    {
      id: WALLET_TOKEN.ETH,
      tokenName: WALLET_TOKEN.ETH,
    },
    {
      id: WALLET_TOKEN.BNB,
      tokenName: WALLET_TOKEN.BNB,
    },
    {
      id: WALLET_TOKEN.BTCB,
      tokenName: WALLET_TOKEN.BTCB,
    },
    {
      id: WALLET_TOKEN.MVL,
      tokenName: WALLET_TOKEN.MVL,
    },
    {
      id: WALLET_TOKEN.bMVL,
      tokenName: WALLET_TOKEN.bMVL,
    },
  ]);

  return (
    <S.Container>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        bounces={false}
        onDragEnd={({ data }) => {
          setData(data);
        }}
      />
    </S.Container>
  );
}

export default WalletEditTokenListScreen;
