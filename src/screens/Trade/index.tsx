import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TradeMainScreen from './Main';

const TradeNavigator = createNativeStackNavigator();

function Trade() {
  return (
    <TradeNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TradeNavigator.Screen name='Main' component={TradeMainScreen} />
    </TradeNavigator.Navigator>
  );
}

export default Trade;
