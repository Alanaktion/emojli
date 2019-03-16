import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';
import PostModalScreen from '../screens/PostModalScreen';

export default createStackNavigator(
  {
    App: createStackNavigator(
      {
        Home: HomeScreen,
        User: UserScreen,
      },
      {
        initialRouteName: 'Home',
      }
    ),
    Modal: createStackNavigator(
      {
        PostModal: PostModalScreen,
      },
      {
        initialRouteName: 'PostModal',
      }
    ),
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
