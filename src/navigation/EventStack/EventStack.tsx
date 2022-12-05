import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import useHeader from '@@hooks/useHeader';
import { EarnEventListScreen, EarnEventDetailsScreen } from '@@screens/EarnEventScreen';

import { TEventStackParamList, EVENT_STACK_ROUTE } from './EventStack.type';

const { Navigator, Screen } = createStackNavigator<TEventStackParamList>();

type ScreenProps = Parameters<typeof Screen>[0];

function EventStack() {
  const { handleStackHeaderOption } = useHeader();

  const screens: Array<ScreenProps> = [
    {
      name: EVENT_STACK_ROUTE.EVENT,
      component: EarnEventListScreen,
    },
    {
      name: EVENT_STACK_ROUTE.DETAILS,
      component: EarnEventDetailsScreen,
      options: {
        ...handleStackHeaderOption({ title: '' }),
        headerShown: true,
      },
    },
  ];

  return (
    <Navigator
      initialRouteName={EVENT_STACK_ROUTE.EVENT}
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'left',
      }}
    >
      {screens.map((props) => (
        <Screen key={props.name} {...props} />
      ))}
    </Navigator>
  );
}

export default EventStack;
