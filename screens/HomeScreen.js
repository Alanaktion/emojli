import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import NavOptions from '../constants/NavOptions';
import Colors from '../constants/Colors';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Emojli',
    ...NavOptions
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* TODO: add timeline view and such here */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: Colors.background,
  },
});
