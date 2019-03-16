import React from 'react';
import { Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import { SafeAreaView } from 'react-navigation';

import NavOptions from '../constants/NavOptions';
import Colors from '../constants/Colors';
import NavButton from '../components/NavButton';
import Button from '../components/Button';

const { apiEndpoint } = Constants.manifest.extra;

export default class SplashScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Emojli',
      headerRight: (
        <View style={{ paddingRight: 15 }}>
          <NavButton
            onPress={() => navigation.navigate('Login')}
            title="Log in"
            color={Platform.OS === 'ios' ? '#fff' : Colors.buttonBg}
            />
        </View>
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
            onPress={() => {
              // this.props.navigation.navigate('Register');
              Linking.openURL(apiEndpoint.substr(0, -3));
            }}
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
