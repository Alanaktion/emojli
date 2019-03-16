import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';

import Colors from '../constants/Colors';

export default class Post extends React.Component {
  componentDidMount() {
    // Keep timestamps on recent posts up-to-date
    const { post } = this.props;
    if (moment.utc(post.created_at).add(2, 'h').isAfter(moment())) {
      this.interval = setInterval(() => this.forceUpdate(), 5e3);
    }
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  timestamp = () => {
    const { post } = this.props;
    return moment.utc(post.created_at).fromNow();
  }

  onUserPress = () => {
    const { onUserPress, post } = this.props;
    onUserPress && onUserPress(post.user);
  }

  render() {
    const { post } = this.props;
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={this.onUserPress}>
          <Image
            style={styles.avatar}
            source={{ uri: post.user.gravatar }}
          />
        </TouchableOpacity>
        <View>
          <View style={styles.meta}>
            <Text style={styles.user}>{post.user.username}</Text>
            <Text style={styles.timestamp}>{this.timestamp()}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  user: {
    fontSize: 16,
  },
  timestamp: {
    marginLeft: 10,
    fontSize: 13,
    color: Colors.text,
  },
  body: {
    fontSize: 16,
    color: Colors.text,
  }
});
