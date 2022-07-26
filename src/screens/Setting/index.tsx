import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingMainScreen from './Main';

const SettingNavigator = createNativeStackNavigator();

function Setting() {
  return (
    <SettingNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingNavigator.Screen name='Main' component={SettingMainScreen} />
    </SettingNavigator.Navigator>
  );
}

export default Setting;
