import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import axios from 'axios';

import NavOptions from '../constants/NavOptions';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import Button from '../components/Button';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Join Emojli',
    ...NavOptions
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* TODO: add registration form */}
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
});
