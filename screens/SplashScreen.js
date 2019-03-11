import React from 'react';
import { StyleSheet, Text, View, Button as NativeButton } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import NavOptions from '../constants/NavOptions';
import Colors from '../constants/Colors';
import Button from '../components/Button';

export default class SplashScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Emojli',
      headerRight: (
        <NativeButton
          onPress={() => navigation.navigate('Login')}
          title="Log in"
          color="#fff"
        />
      ),
      ...NavOptions
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View></View>
        <View style={styles.header}>
          <Text style={styles.h1}>Emojli</Text>
          <Text style={styles.p}>Sign up to join a weird social network!</Text>
        </View>
        <View></View>
        <View>
          <Button
            title="Join Emojli"
            style={{ marginBottom: 15 }}
            onPress={() => this.props.navigation.navigate('Register')}
          />
          {/* <Button
            title="Log in with Google"
            secondary
            onPress={() => {}}
          /> */}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: Colors.tintColor,
  },
  header: {
    alignItems: 'center',
  },
  h1: {
    fontSize: 32,
    color: '#fff',
  },
  p: {
    fontSize: 16,
    color: '#fff',
  }
});
