import { createStackNavigator } from 'react-navigation';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

export default createStackNavigator(
  {
    Splash: SplashScreen,
    Register: RegisterScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Splash',
  }
);
