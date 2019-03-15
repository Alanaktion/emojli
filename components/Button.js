import React from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback } from 'react-native';

import Colors from '../constants/Colors';

export default class Button extends React.Component {
  render() {
    const buttonStyle = [this.props.style, styles.button, this.props.secondary && styles.buttonSecondary];
    const labelStyle = [styles.label, this.props.secondary && styles.labelSecondary];
    const underlayColor = this.props.secondary ? Colors.buttonSecondaryActiveBg : Colors.buttonActiveBg;

    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback
          {...this.props}
          style={buttonStyle}>
          <Text style={labelStyle}>
            {this.props.title}
          </Text>
        </TouchableNativeFeedback>
      );
    }

    return (
      <TouchableHighlight
        {...this.props}
        style={buttonStyle}
        activeOpacity={1}
        underlayColor={underlayColor}>
        <Text style={labelStyle}>
          {this.props.title}
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 4,
    backgroundColor: Colors.buttonBg,
  },
  buttonSecondary: {
    backgroundColor: Colors.buttonSecondaryBg,
  },
  label: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.buttonColor,
  },
  labelSecondary: {
    color: Colors.buttonSecondaryColor,
  }
});
