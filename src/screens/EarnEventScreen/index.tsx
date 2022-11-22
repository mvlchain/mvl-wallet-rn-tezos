import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EarnEventListScreen } from './EarnEventListScreen';

const EarnEventNavigator = createNativeStackNavigator();

const EarnEventScreen = () => {
  return (
    <EarnEventNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <EarnEventNavigator.Screen name='List' component={EarnEventListScreen} />
    </EarnEventNavigator.Navigator>
  );
};

export default EarnEventScreen;
