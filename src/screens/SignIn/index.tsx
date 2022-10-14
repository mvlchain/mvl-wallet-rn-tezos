import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Button, StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

import { CustomAuthAuthServiceImpl } from '@@domain/auth/CustomAuthAuthServiceImpl';
import IAuthService, { AUTH_PROVIDER } from '@@domain/auth/IAuthService';
import ShareRepository from '@@domain/auth/ShareRepository';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import useStore from '@@store/index';

import PinModal from './pin';

type StackProps = TRootStackNavigationProps<'AUTH'>;

function SignIn({ login }: { login: () => void }) {
  const { t, i18n } = useTranslation();

  const auth: IAuthService = new CustomAuthAuthServiceImpl();

  const navigation = useNavigation<StackProps>();
  const { isAuthenticated, toggle } = useStore();
  const [key, setKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  // TEST only
  useEffect(() => {
    try {
      (async () => {
        const rootKey = await ShareRepository.getRootKey('000000');
        setKey(rootKey);
      })();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const signIn = async () => {
    try {
      const key = await auth.signIn(AUTH_PROVIDER.GOOGLE);
      setKey(key);
      await ShareRepository.saveRootKey(key, '000000');
    } catch (e) {
      console.error(e);
      setErrorMsg(String(e));
    }
  };

  const signInApple = async () => {
    try {
      const key = await auth.signIn(AUTH_PROVIDER.APPLE);
      setKey(key);
      await ShareRepository.saveRootKey(key, '000000');
    } catch (e) {
      console.error(e);
      setErrorMsg(String(e));
    }
  };

  const deleteAccount = async () => {
    await auth.deleteAccount();
  };

  const logout = async () => {
    await auth.logout();
  };
  const [value, setValue] = useState<any>('');
  const onChange = (input: any) => {
    setValue(input);
  };

  const goToMain = () => {
    navigation.navigate(ROOT_STACK_ROUTE.MAIN);
  };

  const changeLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ko' : 'en');
  };

  return (
    <View style={styles.container}>
      <Text>{t('address')}</Text>
      <Button title='Change Language' onPress={changeLang} />
      <PinModal />
      <SText>{isAuthenticated ? 'Auth' : 'Unauth'}</SText>
      <Button title='Toggle Auth' onPress={() => toggle()} />
      <Text style={styles.itemLabel}>Key: {key}</Text>
      <Text style={styles.errorLabel}>Error: {errorMsg}</Text>
      <Button title='Login with Google' onPress={signIn} />
      <Button title='Login with Apple' onPress={signInApple} />
      <Button title='Logout' onPress={logout} />
      <Button title='Delete Account' onPress={deleteAccount} />
      <Button title='Go to Main' onPress={goToMain} />
    </View>
  );
}

const SText = styled.Text`
  ${({ theme }) => theme.font.Paragraph.lg}
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  errorLabel: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
  },
});

export default SignIn;
