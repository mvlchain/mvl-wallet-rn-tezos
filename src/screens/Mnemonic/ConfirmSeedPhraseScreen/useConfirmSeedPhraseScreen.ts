import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { NETWORK } from '@@constants/network.constant';
import useWalletMutation from '@@hooks/queries/useWalletMutation';
import { useDi } from '@@hooks/useDi';
import { TAuthStackNavigationProps } from '@@navigation/AuthStack/AuthStack.type';
import authPersistStore from '@@store/auth/authPersistStore';
import authStore from '@@store/auth/authStore';
import { AppScreen } from '@@store/auth/authStore.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useConfirmSeedPhraseScreen = () => {
  const navigation = useNavigation<TAuthStackNavigationProps<'SEED_PHRASE_CONFIRM'>>();
  const { t } = useTranslation();
  const { removeStageByPostboxKey } = authPersistStore();
  const { initWallet } = walletPersistStore();
  const { mnemonic, mnemonicList, pKey, setAppScreen } = authStore();
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
    console.log('onPressConfirmMnemonic');
    if (checkMnemonic()) {
      /**
       * TODO: postboxkey 없을 때 예외처리
       */
      const _postboxKey = keyClient?.postboxKeyHolder?.postboxKey;
      if (!_postboxKey || !pKey) {
        throw new Error('postboxkey and pKey is required');
      }

      // TODO:  추후 지갑을 생성하는 아래의 코드는 별도로 리팩터링 할 것.
      initWallet();
      mutate({ index: 0, network: NETWORK.ETH });
      mutate({ index: 0, network: NETWORK.TEZOS });
      removeStageByPostboxKey(_postboxKey);

      // reset AuthStack navigation
      navigation.popToTop();
      setAppScreen(AppScreen.Root);
    } else {
      openModal(MODAL_TYPES.TEXT_MODAL, {
        title: t('incorrect_seed_phrase'),
        label: t('plz_try_again'),
      });
    }
  };

  return {
    disabled,
    onPressConfirmMnemonic,
  };
};

export default useConfirmSeedPhraseScreen;
