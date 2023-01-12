import { useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { Linking, Platform } from 'react-native';
import VersionCheck from 'react-native-version-check';

import { IOS_APPSTORE_ID } from '@@constants/app.constant';

export const useSettingAppVersionScreen = () => {
  const [needUpdate, setNeedUpdate] = useState<boolean>(false);
  useFocusEffect(() => {
    VersionCheck.needUpdate().then(async (res) => {
      if (!res.isNeeded) {
        setNeedUpdate(false);
      }
    });
  });

  const onPressUpdate = async () => {
    const store =
      Platform.OS === 'android'
        ? await VersionCheck.getPlayStoreUrl({ packageName: VersionCheck.getPackageName() })
        : await VersionCheck.getAppStoreUrl({ appID: IOS_APPSTORE_ID });
    Linking.openURL(store);
  };

  return {
    needUpdate,
    onPressUpdate,
  };
};
