import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import Colors from '../constants/Colors';

export default class NavButton extends React.Component {
  state = {
    active: false,
  };

  render() {
    const buttonStyle = [this.props.style, styles.button, this.state.active && styles.buttonActive];
    const labelStyle = [styles.label, this.state.active && styles.labelActive];
    return (
      <TouchableWithoutFeedback
        {...this.props}
        onPressIn={() => this.setState({active: true})}
        onPressOut={() => this.setState({active: false})}>
        <View style={buttonStyle}>
          <Text style={labelStyle}>
            {this.props.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: Colors.tint,
  },
  buttonActive: {
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
  },
  labelActive: {
    color: Colors.tintColor,
  },
});
