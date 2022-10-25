import PINCode from '@haskkor/react-native-pincode';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-native';

import { BiometricSmallLight, PasswordDeleteLight } from '@@assets/image';

import * as S from './PincodeModal.style';
import usePincodeModal from './usePincodeModal';

function PincodeModal() {
  const { t } = useTranslation();
  const { isOpen, mode, pin, interruption, whenMatch, initialSave } = usePincodeModal();
  return (
    <Modal visible={isOpen} onRequestClose={interruption}>
      <S.PincodeModalContainer>
        <PINCode
          maxAttempts={500000}
          status={mode}
          passwordLength={6}
          storePin={initialSave}
          storedPin={pin}
          finishProcess={whenMatch}
          touchIDDisabled={false}
          vibrationEnabled={false}
          //TODO: 다국어
          titleChoose={t('password_pin_not_match')}
          titleEnter={t('password_enter_pin')}
          titleConfirm={t('password_reenter_pin')}
          //TODO: 외부라이브러리스타일 바꾸는게 좀 한계가 있다. 두줄이 불가능한데 문구를 잘라도 괜찮은가?
          titleConfirmFailed={t('password_pin_not_match')}
          titleAttemptFailed={t('password_wrong_pin')}
          {...S.PincodeModalStyle}
          //TODO: theme
          customBackSpaceIcon={() => (
            <S.DeleteButton>
              <PasswordDeleteLight />
            </S.DeleteButton>
          )}
          disableLockScreen={true}
          bottomLeftComponent={() => (
            <S.NumberButton>
              <BiometricSmallLight />
            </S.NumberButton>
          )}
        />
      </S.PincodeModalContainer>
    </Modal>
  );
}
export default PincodeModal;
