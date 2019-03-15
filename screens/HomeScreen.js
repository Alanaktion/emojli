import React from 'react';
import { Alert, AsyncStorage, FlatList, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Constants } from 'expo';
import { SafeAreaView } from 'react-navigation';
import axios from 'axios';

import NavOptions from '../constants/NavOptions';
import Colors from '../constants/Colors';
import Post from '../components/Post';
import NavButton from '../components/NavButton';

export default class HomeScreen extends React.Component {
  state = {
    user: {},
    posts: [],
    page: 0,
    nextPage: null,
  };

  static navigationOptions = ({ navigation }) => {
    // TODO: move user touchable to the left on iOS
    return {
      title: 'Emojli',
      headerRight: (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 15 }}>
          <TouchableWithoutFeedback
            accessibilityLabel="Me"
            onPress={() => {}}>
            <Text>{navigation.getParam('username')}</Text>
          </TouchableWithoutFeedback>
          <View style={{ width: 15 }} />
          <NavButton
            title="Post"
            onPress={() => {}}
            />
        </View>
      ),
      ...NavOptions
    };
  };

  async componentWillMount() {
    // Get user from storage
    let userJson = await AsyncStorage.getItem('user');
    const user = JSON.parse(userJson);
    this.setState({
      user,
    });

    const { navigation } = this.props;
    navigation.setParams({
      username: user.username,
    });

    // Load posts
    let response = await axios.get('posts');
    let { data } = response;
    this.setState({
      posts: data.data,
      page: data.current_page,
      nextPage: data.next_page_url,
    })
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.posts}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Post post={item} />}
          />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.background,
  },
});
