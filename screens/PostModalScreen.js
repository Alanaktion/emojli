import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { storePost } from '../lib/api';
import NavOptions from '../constants/NavOptions';
import Colors from '../constants/Colors';
import NavButton from '../components/NavButton';
import Input from '../components/Input';
import { ScrollView } from 'react-native-gesture-handler';
import emojiRegex from 'emoji-regex';

export default class HomeScreen extends React.Component {
  state = {
    body: '',
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity
          style={{ paddingHorizontal: 15, paddingVertical: 8 }}
          onPress={() => navigation.navigate('App')}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerRight: (
        <View style={{ paddingRight: 15 }}>
          <NavButton
            title="Post"
            onPress={() => {navigation.getParam('submit')()}}
            />
        </View>
      ),
      ...NavOptions
    };
  };

  async componentDidMount() {
    this.props.navigation.setParams({
      submit: this.submitAsync,
    });
  }

  change = input => {
    // TODO: support newlines and maybe punctuation
    const regex = emojiRegex();
    let body = '';
    let match;
    while (match = regex.exec(input)) {
      body += match[0];
    }
    this.setState({
      body,
    });
  };

  submitAsync = async () => {
    try {
      await storePost(this.state.body);
    } catch (e) {
      Alert.alert('Oops!', 'Something went wrong posting. Make sure you\'re online and only using Emoji!');
      return;
    }
    this.props.navigation.navigate('App');
    // TODO: refresh post list
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ padding: 15 }}>
          <Text style={styles.label}>Write a post (Emoji only!)</Text>
          <Input
            onChangeText={this.change}
            value={this.state.body}
            multiline
            numberOflines={4}
            returnKeyType="go"
            onSubmitEditing={this.submitAsync}
            autoFocus
            />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  cancel: {
    fontSize: 15,
    color: '#fff',
  },
  label: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 10,
  },
});
