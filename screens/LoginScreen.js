import React from 'react';
import { Alert, AsyncStorage, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import { SafeAreaView } from 'react-navigation';
import axios from 'axios';

import NavOptions from '../constants/NavOptions';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import Button from '../components/Button';

export default class HomeScreen extends React.Component {
  state = {
    username: '',
    password: '',
    loading: false,
  };

  static navigationOptions = {
    title: 'Log In',
    ...NavOptions
  };

  logInAsync = async () => {
    if (!this.state.username) {
      this._usernameInput && this._usernameInput._root.focus();
      return;
    }
    if (!this.state.password) {
      this._passwordInput && this._passwordInput._root.focus();
      return;
    }

    let response;
    try {
      response = await axios.post('auth/login', {
        username: this.state.username,
        password: this.state.password,
      });
      if (response.data.status !== 'success') {
        throw 'invalid login';
      }
    } catch (e) {
      Alert.alert('Invalid login', 'Your username or password is incorrect.');
      return;
    }
    const token = response.headers.authorization;
    await AsyncStorage.setItem('userToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    response = await axios.get('auth/user');
    await AsyncStorage.setItem('user', JSON.stringify(response.data.data));
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <Input
            onChangeText={username => this.setState({username})}
            autoCorrect={false}
            value={this.state.username}
            style={{ marginTop: 10 }}
            onSubmitEditing={() => {
              this._passwordInput && this._passwordInput._root.focus();
            }}
            blurOnSubmit={false}
            ref={ref => { this._usernameInput = ref }}
            returnKeyType="next"
            autoFocus
          />
          <Text style={styles.label}>Password</Text>
          <Input
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            style={{ marginTop: 10 }}
            onSubmitEditing={this.logInAsync}
            blurOnSubmit={true}
            ref={ref => { this._passwordInput = ref }}
            returnKeyType="go"
            secureTextEntry={true}
          />
          <Button
            title="Sign in"
            style={{ marginTop: 30 }}
            onPress={this.logInAsync}
            />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.background,
  },
  form: {
    width: Dimensions.get('window').width > 600 ? 400 : null,
    alignSelf: Dimensions.get('window').width > 600 ? 'center' : 'stretch',
  },
  label: {
    marginTop: 15,
    color: Colors.text,
  },
});
