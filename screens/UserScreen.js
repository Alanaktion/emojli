import React from 'react';
import { AsyncStorage, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { loadUserPosts } from '../lib/api';
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
    const user = navigation.getParam('user');
    const me = navigation.getParam('me');
    const logOut = () => {
      AsyncStorage.removeItem('userToken');
      navigation.navigate('Auth');
    }
    return {
      title: user.username,
      headerRight: me && <NavButton title="Log out" onPress={logOut} style={{ marginRight: 15 }} />,
      ...NavOptions
    };
  };

  async componentWillMount() {
    await this.loadPosts();
  };

  loadPosts = async () => {
    this.setState({
      refreshing: true,
    })
    const username = this.props.navigation.getParam('user').username;
    let response = await loadUserPosts(username);
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
      <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}>
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 15, paddingBottom: 34 }}
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
