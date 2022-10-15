import PINCode from '@haskkor/react-native-pincode';
import { Text } from 'react-native';

import { BiometricSmallLight, PasswordDeleteLight } from '@@assets/image';
import { theme } from '@@style/theme';

import * as S from './Pincode.style';

function Pincode() {
  return (
    <S.PincodeContainer>
      <PINCode
        maxAttempts={500000}
        status={'choose'}
        passwordLength={6}
        //TODO: 다국어
        titleChoose={'Passwords do not match.'}
        titleEnter={'Please enter PIN number.'}
        titleConfirm={'Please enter PIN number once more.'}
        //TODO: 외부라이브러리스타일 바꾸는게 좀 한계가 있다. 두줄이 불가능한데 문구를 잘라도 괜찮은가?
        titleConfirmFailed={'Passwords do not match.'}
        titleAttemptFailed={'Wrong PIN number.'}
        {...S.PincodeStyle}
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
    </S.PincodeContainer>
  );
}
export default Pincode;
