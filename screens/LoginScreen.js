import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
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

  async logInAsync() {
    //
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <Input
            onChangeText={username => this.setState({username})}
            value={this.state.username}
            style={{ marginTop: 10 }}
            returnKeyType="next"
          />
          <Text style={styles.label}>Password</Text>
          <Input
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            style={{ marginTop: 10 }}
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
