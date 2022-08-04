import { Platform } from 'react-native';
import {
  ACCESS_CONTROL,
  ACCESSIBLE,
  AUTHENTICATION_TYPE,
  getGenericPassword,
  getSupportedBiometryType,
  resetGenericPassword,
  setGenericPassword,
} from 'react-native-keychain';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { BIOMETRY_CHOICE, BIOMETRY_CHOICE_DISABLED, PASSCODE_CHOICE, PASSCODE_DISABLED, TRUE } from '../constants/storage';
import { strings } from '../locales/i18n';

import Encryptor from './Encryptor';

const privates = new WeakMap();
const encryptor = new Encryptor();
const defaultOptions = {
  service: 'io.mvlchain.wallet',
  authenticationPromptTitle: strings('authentication.auth_prompt_title'),
  authenticationPrompt: { title: strings('authentication.auth_prompt_desc') },
  authenticationPromptDesc: strings('authentication.auth_prompt_desc'),
  fingerprintPromptTitle: strings('authentication.fingerprint_prompt_title'),
  fingerprintPromptDesc: strings('authentication.fingerprint_prompt_desc'),
  fingerprintPromptCancel: strings('authentication.fingerprint_prompt_cancel'),
};

class SecureKeychain {
  static instance?: SecureKeychain;
  isAuthenticating = false;

  constructor(code: string) {
    if (!SecureKeychain.instance) {
      privates.set(this, { code });
      SecureKeychain.instance = this;
    }

    return SecureKeychain.instance;
  }

  encryptPassword(password: string): Promise<string> {
    return encryptor.encrypt(privates.get(this).code, { password });
  }

  decryptPassword(str: string): Promise<{ password: string }> {
    return encryptor.decrypt(privates.get(this).code, str);
  }
}

let instance: SecureKeychain;

export const SECURE_TYPES = {
  BIOMETRICS: 'BIOMETRICS',
  PASSCODE: 'PASSCODE',
  REMEMBER_ME: 'REMEMBER_ME',
} as const;

const secureKeychain = {
  init(salt: string) {
    instance = new SecureKeychain(salt);

    Object.freeze(instance);
    return instance;
  },

  getInstance() {
    return instance;
  },

  getSupportedBiometryType() {
    return getSupportedBiometryType();
  },

  async resetGenericPassword() {
    const options = { service: defaultOptions.service };
    await AsyncStorage.removeItem(BIOMETRY_CHOICE);
    await AsyncStorage.removeItem(PASSCODE_CHOICE);
    return resetGenericPassword(options);
  },

  async getGenericPassword() {
    if (instance) {
      instance.isAuthenticating = true;
      const keychainObject = await getGenericPassword(defaultOptions);
      if (keychainObject !== false && keychainObject.password) {
        const encryptedPassword = keychainObject.password;
        const decrypted = await instance.decryptPassword(encryptedPassword);
        keychainObject.password = decrypted.password;
        instance.isAuthenticating = false;
        return keychainObject;
      }
      instance.isAuthenticating = false;
    }
    return null;
  },

  async setGenericPassword(password: string, type?: SecureType) {
    const authOptions: {
      accessible: ACCESSIBLE;
      accessControl?: ACCESS_CONTROL;
    } = {
      accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      accessControl: undefined,
    };

    if (type === SECURE_TYPES.BIOMETRICS) {
      authOptions.accessControl = ACCESS_CONTROL.BIOMETRY_CURRENT_SET;
    } else if (type === SECURE_TYPES.PASSCODE) {
      authOptions.accessControl = ACCESS_CONTROL.DEVICE_PASSCODE;
    } else if (type === SECURE_TYPES.REMEMBER_ME) {
      //Don't need to add any parameter
    } else {
      // Setting a password without a type does not save it
      return await this.resetGenericPassword();
    }

    const encryptedPassword = await instance.encryptPassword(password);
    await setGenericPassword('clutch-user', encryptedPassword, {
      ...defaultOptions,
      ...authOptions,
    });

    if (type === SECURE_TYPES.BIOMETRICS) {
      await AsyncStorage.setItem(BIOMETRY_CHOICE, TRUE);
      await AsyncStorage.setItem(PASSCODE_DISABLED, TRUE);
      await AsyncStorage.removeItem(PASSCODE_CHOICE);
      await AsyncStorage.removeItem(BIOMETRY_CHOICE_DISABLED);

      // If the user enables biometrics, we're trying to read the password
      // immediately so we get the permission prompt
      if (Platform.OS === 'ios') {
        await this.getGenericPassword();
      }
    } else if (type === SECURE_TYPES.PASSCODE) {
      await AsyncStorage.removeItem(BIOMETRY_CHOICE);
      await AsyncStorage.removeItem(PASSCODE_DISABLED);
      await AsyncStorage.setItem(PASSCODE_CHOICE, TRUE);
      await AsyncStorage.setItem(BIOMETRY_CHOICE_DISABLED, TRUE);
    } else if (type === SECURE_TYPES.REMEMBER_ME) {
      await AsyncStorage.removeItem(BIOMETRY_CHOICE);
      await AsyncStorage.setItem(PASSCODE_DISABLED, TRUE);
      await AsyncStorage.removeItem(PASSCODE_CHOICE);
      await AsyncStorage.setItem(BIOMETRY_CHOICE_DISABLED, TRUE);
      //Don't need to add any parameter
    }
  },
  ACCESS_CONTROL: ACCESS_CONTROL,
  ACCESSIBLE: ACCESSIBLE,
  AUTHENTICATION_TYPE: AUTHENTICATION_TYPE,
};

export default secureKeychain;

export type SecureType = typeof SECURE_TYPES[keyof typeof SECURE_TYPES];