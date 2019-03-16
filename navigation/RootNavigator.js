import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AppStack from './AppNavigator';
import AuthStack from './AuthNavigator';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <StatusBar barStyle="default" />
        <ActivityIndicator />
      </View>
    );
  }
}

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
