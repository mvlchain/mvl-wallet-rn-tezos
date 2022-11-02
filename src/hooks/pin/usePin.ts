import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { PERMISSIONS } from 'react-native-permissions';
import TouchID from 'react-native-touch-id';

import { PIN_MODE, PIN_SETUP_STAGE, PIN_REQUIRE_LENGTH } from '@@constants/pin.constant';
import { pinStore } from '@@store/pin/pinStore';
import SecureKeychain, { SECURE_TYPES } from '@@utils/SecureKeychain';
import { requestPermission, getNotGrantedList, openSettingAlert } from '@@utils/permissions/permissions';
import { TRequestPermissionResultType } from '@@utils/permissions/permissions.type';

function usePin() {
  const [input, setInput] = useState('');
  const [inputCheck, setInputCheck] = useState('');
  const { pinMode, stage, current, setState, success, resetStore } = pinStore();
  const { t } = useTranslation();
  const isSetupFirstStage = pinMode === PIN_MODE.SETUP && stage === PIN_SETUP_STAGE.FIRST;

  useEffect(() => {
    setInputCheck(input);
  }, [isSetupFirstStage && input.length === 6]);

  const judge = async () => {
    switch (pinMode) {
      case PIN_MODE.CONFIRM:
        const credential = await SecureKeychain.getGenericPassword();
        if (input === credential?.password) {
          success(input);
          resetStore();
        } else {
          setState({ isError: true, errorMessage: t('password_wrong_pin') });
        }
        break;
      case PIN_MODE.SETUP:
        if (stage === PIN_SETUP_STAGE.FIRST) {
          setState({ stage: PIN_SETUP_STAGE.SECOND });
        } else {
          if (input === inputCheck) {
            await SecureKeychain.setGenericPassword(input, SECURE_TYPES.REMEMBER_ME);
            success(input);
            resetStore();
          } else {
            setState({ isError: true, errorMessage: t('password_pin_not_match') });
          }
        }
        break;
      case PIN_MODE.RESET:
        break;
      default:
        break;
    }
    setInput('');
    setState({ current: 0 });
  };

  const backSpace = () => {
    if (current === 0) return;
    setInput(input.slice(0, -1));
    setState({
      current: current - 1,
    });
  };

  const bioAuth = async () => {
    // triggerTouchID();
    const optionalConfigObject = {
      title: 'Authentication Required', // Android
      color: '#e00606', // Android,
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    };
    try {
      // requestPermission({
      //   ios: [PERMISSIONS.IOS.FACE_ID],
      //   android: [PERMISSIONS.ANDROID.BODY_SENSORS, PERMISSIONS.ANDROID.BODY_SENSORS_BACKGROUND],
      // }).then(async (res) => {
      //   console.log('res', res);
      //   const { DENIED, BLOCKED } = getNotGrantedList(res as TRequestPermissionResultType);
      //   if (BLOCKED.length !== 0) {
      //     openSettingAlert({
      //       title: t('biometric_not_enrolled'),
      //       content: t('biometric_not_enrolled'),
      //     });
      //   }
      // });

      if (!TouchID) {
        return;
      }
      const isSupported = await TouchID.isSupported();
      console.log(isSupported, 'isSupported');
      if (!isSupported) {
        console.log(t('biometric_not_available'));
        return;
      }
      console.log('>>>>>>>>>>>>>>>>>');
      const result = await TouchID.authenticate(t('enable_touchid'), optionalConfigObject);
      console.log('result,result', result);
    } catch (err) {
      console.log(err);
    }
  };

  const triggerTouchID = () => {
    !!TouchID &&
      TouchID.isSupported()
        .then(() => {
          setTimeout(() => {
            launchTouchID();
          });
        })
        .catch((error: any) => {
          console.warn('TouchID error', error);
        });
  };

  const launchTouchID = async () => {
    const optionalConfigObject = {
      imageColor: '#e00606',
      imageErrorColor: '#ff0000',
      sensorDescription: 'Touch sensor',
      sensorErrorDescription: 'Failed',
      fallbackLabel: 'Show Passcode',
    };
    try {
      await TouchID.authenticate('MM', optionalConfigObject).then((success: any) => {
        console.log('Y~');
      });
    } catch (e) {
      console.log('TouchID error', e);
    }
  };

  const setPassword = async (num: string) => {
    const isFinishInput = current === PIN_REQUIRE_LENGTH;
    if (isFinishInput) {
      await judge();
    } else {
      setInput(input + num);
      setState({ current: current + 1 });
    }
  };

  return {
    input,
    backSpace,
    bioAuth,
    setPassword,
  };
}

export default usePin;
