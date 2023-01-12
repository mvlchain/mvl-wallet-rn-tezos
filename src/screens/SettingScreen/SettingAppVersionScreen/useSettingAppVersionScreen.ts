import { useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';

export const useSettingAppVersionScreen = () => {
  const [needUpdate, setNeedUpdate] = useState<boolean>(false);
  useFocusEffect(() => {
    VersionCheck.needUpdate().then(async (res) => {
      if (!res.isNeeded) {
        setNeedUpdate(false);
      }
    });
  });

  const onPressUpdate = () => {
    Linking.openURL(VersionCheck.getPackageName());
  };

  return {
    needUpdate,
    onPressUpdate,
  };
};
