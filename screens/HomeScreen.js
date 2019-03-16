import React from 'react';
import { AsyncStorage, FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { refresh, loadPosts } from '../lib/api';
import NavOptions from '../constants/NavOptions';
import Colors from '../constants/Colors';
import Post from '../components/Post';
import NavButton from '../components/NavButton';

export default class HomeScreen extends React.Component {
  state = {
    user: {},
    refreshing: false,
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
            onPress={() => navigation.navigate('PostModal')}
            />
        </View>
      ),
      ...NavOptions
    };
  };

  async componentWillMount() {
    let userJson = await AsyncStorage.getItem('user');
    const user = JSON.parse(userJson);
    this.setState({
      user,
    });
    const { navigation } = this.props;
    navigation.setParams({
      username: user.username,
    });

    // Refresh token
    try {
      await refresh();
    } catch (e) {
      alert('Your login has expired.');
      await AsyncStorage.removeItem('userToken');
      this.props.navigation.navigate('Auth');
      return;
    }

    // Fetch posts
    await this.loadPosts();
  };

  loadPosts = async () => {
    this.setState({
      refreshing: true,
    })
    let response = await loadPosts();
    let { data } = response;
    this.setState({
      refreshing: false,
      posts: data.data,
      page: data.current_page,
      nextPage: data.next_page_url,
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 15, paddingBottom: 0 }}
          refreshing={this.state.refreshing}
          onRefresh={this.loadPosts}
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
    backgroundColor: Colors.background,
  },
});
