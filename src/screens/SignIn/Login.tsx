import React from 'react';

import { Simple } from '@@assets/image';
import { AppleButton, GoogleButton } from '@@components/BasicComponents/Buttons/SocialButton';

import * as S from './Login.style';

function Login() {
  const google = () => {};
  const apple = () => {};

  return (
    <S.LoginContainer>
      <S.LoginTitleWrapper>
        {/* TODO: 다국어작업 */}
        <S.LoginTitle>Cryptocurrency Wallet for</S.LoginTitle>
        <S.LoginTitle>Mobility Ecosystem</S.LoginTitle>
        <S.LoginSubTitle>Manage your MVL more conveniently.</S.LoginSubTitle>
      </S.LoginTitleWrapper>
      <Simple />
      <S.LoginButtonWrapper>
        <GoogleButton onPress={() => google()} />
        <AppleButton onPress={() => apple()} wrapperStyle={S.LoginInlineStyle.marginTop} />
      </S.LoginButtonWrapper>
    </S.LoginContainer>
  );
}

export default Login;
