import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { MODAL_TYPES } from '@@components/Modals/GlobalModal';
import { useDi } from '@@hooks/common/useDi';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import authPersistStore from '@@store/auth/authPersistStore';
import authStore from '@@store/auth/authStore';
import globalModalStore from '@@store/globalModal/globalModalStore';

const useConfirmSeedPhraseScreen = () => {
  type rootStackProps = TRootStackNavigationProps<'SEED_PHRASE_CONFIRM'>;
  const navigation = useNavigation<rootStackProps>();
  const { t } = useTranslation();
  const keyClient = useDi('KeyClient');
  const { removeStageByPostboxKey } = authPersistStore();
  const { mnemonic, mnemonicList } = authStore();
  const { openModal } = globalModalStore();
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
      if (!_postboxKey) {
        throw new Error('postboxkey is required');
      }
      removeStageByPostboxKey(_postboxKey);
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
