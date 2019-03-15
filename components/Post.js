import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';

export default class Post extends React.Component {
  render() {
    const { post } = this.props;
    return (
      <View style={styles.card}>
        <Image
          style={styles.avatar}
          source={{ uri: post.user.gravatar }} />
        <View>
          <View style={styles.meta}>
            <Text style={styles.user}>{post.user.username}</Text>
          </View>
          <Text style={styles.body}>{post.body}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderColor: Colors.buttonSecondaryBg,
    borderWidth: 1,
    borderRadius: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 15,
    borderRadius: 20,
  },
  meta: {
    marginBottom: 10,
  },
  user: {
    fontSize: 16,
  },
  body: {
    fontSize: 16,
    color: Colors.text,
  }
});
