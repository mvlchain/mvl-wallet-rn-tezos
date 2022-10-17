import { Protect } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { width, height } from '@@utils/ui';

import * as S from './Login.style';

function PincodeGuide() {
  return (
    <S.LoginContainer>
      <S.LoginTitleWrapper>
        {/* TODO: 다국어작업 */}
        <S.LoginTitle>Set PIN number</S.LoginTitle>
        <S.LoginSubTitle>
          Please set a 6-digit PIN number to prevent anyone from accessing your wallet. The PIN number is required when running the app and sending
          tokens.
        </S.LoginSubTitle>
      </S.LoginTitleWrapper>
      <Protect />
      <S.PrimaryButtonWrapper>
        <PrimaryButton label={'Set PIN Number'} onPress={() => {}} />
      </S.PrimaryButtonWrapper>
    </S.LoginContainer>
  );
}

export default PincodeGuide;
