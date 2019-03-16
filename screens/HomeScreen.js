import React from 'react';
import { AsyncStorage, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    const user = navigation.getParam('user');
    const userButton = (
      <View style={{ marginHorizontal: 15 }}>
        <TouchableOpacity
          accessibilityLabel="Me"
          onPress={() => {
            navigation.navigate('User', {
              user: user,
              me: true,
            });
          }}>
          <Text>{user && user.username}</Text>
        </TouchableOpacity>
      </View>
    );
    return {
      headerLeft: Platform.OS === 'ios' && userButton,
      title: 'Emojli',
      headerRight: (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 15 }}>
          {Platform.OS === 'android' && userButton}
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
      user,
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

  showUser = (user) => {
    this.props.navigation.navigate('User', {user});
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
          renderItem={({item}) => <Post post={item} onUserPress={this.showUser} />}
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
