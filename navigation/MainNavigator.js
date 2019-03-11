import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';

export default createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
  }
);
