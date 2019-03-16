import React from 'react';
import { Alert, AsyncStorage, Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import emojiRegex from 'emoji-regex';
import axios from 'axios';

import { logIn, getUser } from '../lib/api';
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

  change = input => {
    const regex = emojiRegex();
    let username = '';
    let match;
    while (match = regex.exec(input)) {
      username += match[0];
    }
    this.setState({
      username,
    });
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

    try {
      await logIn(this.state.username, this.state.password);
    } catch (e) {
      Alert.alert('Invalid login', 'Your username or password is incorrect.');
      return;
    }
    const userResponse = await getUser();
    await AsyncStorage.setItem('user', JSON.stringify(userResponse.data.data));
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <Input
            onChangeText={this.change}
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
