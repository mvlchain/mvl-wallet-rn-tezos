import React from 'react';
import 'reflect-metadata';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { setAxiosConfig } from 'utils/request';

import { ROUTE_NAME } from '@@assets/constants';
import Home from '@@screens/Home';
import Login from '@@screens/Login';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTE_NAME.WALLET}>
        <Stack.Screen
          name={ROUTE_NAME.WALLET}
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name={ROUTE_NAME.LOGIN} component={Login} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          {/* // Modal */}
          {/* <Stack.Screen name="MyModal" component={ModalScreen} /> */}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
