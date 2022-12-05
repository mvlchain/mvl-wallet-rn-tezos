import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EarnEventListScreen, EarnEventDetailsScreen } from '@@screens/EarnEventScreen';

import { TEventStackParamList, EVENT_STACK_ROUTE } from './EventStack.type';

const { Navigator, Screen } = createNativeStackNavigator<TEventStackParamList>();

function EventStack() {
  return (
    <Navigator
      initialRouteName={EVENT_STACK_ROUTE.EVENT}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen key={EVENT_STACK_ROUTE.EVENT} name={EVENT_STACK_ROUTE.EVENT} component={EarnEventListScreen} />
      <Screen key={EVENT_STACK_ROUTE.DETAILS} name={EVENT_STACK_ROUTE.DETAILS} component={EarnEventDetailsScreen} />
    </Navigator>
  );
}

export default EventStack;
