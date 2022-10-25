import React from 'react';

import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

import { Simple } from '@@assets/image';
import { AppleButton, GoogleButton } from '@@components/BasicComponents/Buttons/SocialButton';
import { AUTH_PROVIDER } from '@@domain/auth/IAuthService';

import * as S from './SignIn.style';
import useSignIn from './useSignIn';

function SignIn() {
  const { t } = useTranslation();
  const { signIn } = useSignIn();
  return (
    <S.SignInContainer>
      <S.SignInTitleWrapper>
        <S.SignInTitle>{t('auth_lbl_title')}</S.SignInTitle>
        <S.SignInSubTitle>{t('auth_lbl_description')}</S.SignInSubTitle>
      </S.SignInTitleWrapper>
      <Simple />
      <S.SignInButtonWrapper>
        <GoogleButton onPress={() => signIn(AUTH_PROVIDER.GOOGLE)} />
        {Platform.OS === 'ios' && <AppleButton onPress={() => signIn(AUTH_PROVIDER.APPLE)} wrapperStyle={S.SignInInlineStyle.marginTop} />}
      </S.SignInButtonWrapper>
    </S.SignInContainer>
  );
}

export default SignIn;
