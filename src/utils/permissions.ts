import i18next from 'i18next';
import { Alert, Platform } from 'react-native';
import { RESULTS, requestMultiple, Permission, IOSPermission, AndroidPermission, PermissionStatus, openSettings } from 'react-native-permissions';

import * as Type from './permissions.type';

export const requestPermission = async (permissionObj: Type.TPermissionObj) => {
  try {
    if (Platform.OS === 'ios') {
      return await requestMultiple(permissionObj.ios);
    } else if (Platform.OS === 'android') {
      return await requestMultiple(permissionObj.android);
    }
  } catch (e) {
    console.log(e);
  }
};

export const getNotGrantedList = (result: Type.TRequestPermissionResultType) => {
  const notGrantedArr: { DENIED: Permission[]; BLOCKED: Permission[] } = {
    DENIED: [],
    BLOCKED: [],
  };

  Object.keys(result).forEach((key: string) => {
    if (result[key as Permission] === RESULTS.DENIED) {
      notGrantedArr.DENIED.push(key as Permission);
    } else if (result[key as Permission] === RESULTS.BLOCKED) {
      notGrantedArr.BLOCKED.push(key as Permission);
    }
  });

  return notGrantedArr;
};

export const openSettingAlert = (whenBlockedObj: Type.TWhenPermissionBlockedObj) => {
  Alert.alert(
    whenBlockedObj.title,
    whenBlockedObj.content,
    [
      {
        text: i18next.t('cancel'),
        style: 'cancel',
        onPress: whenBlockedObj.onPressCancel,
      },
      { text: i18next.t('settings'), onPress: async () => openSettings() },
    ],
    { cancelable: false }
  );
};
