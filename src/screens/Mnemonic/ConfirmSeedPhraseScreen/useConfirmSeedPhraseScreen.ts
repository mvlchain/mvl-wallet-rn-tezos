import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { ETHEREUM } from '@@domain/blockchain/BlockChain';
import useWalletMutation from '@@hooks/queries/useWalletMutation';
import { useDi } from '@@hooks/useDi';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import authPersistStore from '@@store/auth/authPersistStore';
import authStore from '@@store/auth/authStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useConfirmSeedPhraseScreen = () => {
  type rootStackProps = TRootStackNavigationProps<'SEED_PHRASE_CONFIRM'>;
  const navigation = useNavigation<rootStackProps>();
  const { t } = useTranslation();
  const { removeStageByPostboxKey } = authPersistStore();
  const { initWallet } = walletPersistStore();
  const { mnemonic, mnemonicList, pKey } = authStore();
  const { openModal } = globalModalStore();
  const keyClient = useDi('KeyClient');
  const { mutate } = useWalletMutation();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (mnemonicList.filter((mnemonic) => mnemonic.word === '').length !== 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [mnemonicList]);

  const checkMnemonic = () => {
    // mnemonic 없을 때 예외처리(에러처리)추가
    if (disabled || !mnemonic) return;
    const mnemonicArr = mnemonic.split(' ');
    for (let i = 0; i < mnemonicList.length; i += 1) {
      const typedMnemonic = mnemonicList[i];
      if (!(mnemonicArr[typedMnemonic.index - 1] === typedMnemonic.word)) {
        return false;
      }
    }
    return true;
  };

  const onPressConfirmMnemonic = () => {
    if (checkMnemonic()) {
      /**
       * TODO: postboxkey 없을 때 예외처리
       *  */
      const _postboxKey = keyClient?.postboxKeyHolder?.postboxKey;
      if (!_postboxKey || !pKey) {
        throw new Error('postboxkey and pKey is required');
      }
      removeStageByPostboxKey(_postboxKey);
      initWallet();
      mutate({ pKey, index: 0, blockchain: ETHEREUM });
      navigation.reset({
        index: 0,
        routes: [{ name: ROOT_STACK_ROUTE.MAIN }],
      });
    } else {
      // TODO: 다국어 요청
      openModal(MODAL_TYPES.TEXT_MODAL, {
        title: t('Incorrect Seed Phrase'),
        label: t('Please try again.'),
      });
    }
  };

  return {
    disabled,
    onPressConfirmMnemonic,
  };
};

export default useConfirmSeedPhraseScreen;
