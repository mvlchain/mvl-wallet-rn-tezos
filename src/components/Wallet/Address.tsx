import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { CopyIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { ETHEREUM } from '@@domain/blockchain/BlockChain';
import { WalletDto } from '@@domain/model/WalletDto';
import useWalletMutation from '@@hooks/queries/useWalletMutation';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import authStore from '@@store/auth/authStore';
import { fontSize, width, height } from '@@utils/ui';

function Address({ address }: { address: string }) {
  const [walletList, setWalletList] = useState<WalletDto[]>([]);
  const { pKey } = authStore();
  const { data } = useWalletsQuery({
    onSuccess: (data) => {
      setWalletList(data);
    },
  });

  const { mutate } = useWalletMutation();

  return (
    <View>
      <Text style={styles.label}>Address</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.address}>{walletList[0]?.address}</Text>

        <CopyIcon width={width * 20} height={width * 20} style={styles.copyIcon} />
      </View>
      <PrimaryButton
        onPress={() => {
          mutate({ pKey: pKey ?? 'TODO: ERROR', index: walletList.length, blockchain: ETHEREUM });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: fontSize(16), color: '#808080' },
  addressContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: height * 4 },
  address: { fontSize: fontSize(18), color: '#000000', flexShrink: 1 },
  copyIcon: { marginLeft: width * 24 },
});

export default Address;
