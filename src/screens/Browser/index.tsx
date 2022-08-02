import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BrowserMainScreen from './Main';

const BrowserNavigator = createNativeStackNavigator();

function Browser() {
  return (
    <BrowserNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BrowserNavigator.Screen name='Main' component={BrowserMainScreen} />
    </BrowserNavigator.Navigator>
  );
}

export default Browser;
