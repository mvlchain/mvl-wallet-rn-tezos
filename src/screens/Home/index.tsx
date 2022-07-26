import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeMain from './Main';

const HomeNavigator = createNativeStackNavigator();

function Home() {
  return (
    <HomeNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeNavigator.Screen name='Main' component={HomeMain} />
    </HomeNavigator.Navigator>
  );
}

export default Home;
