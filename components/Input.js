import React from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';

import Colors from '../constants/Colors';

export default class Input extends React.Component {
  state = {
    focused: false,
  };

  render() {
    return (
      <TextInput
        {...this.props}
        style={[
          styles.input,
          this.state.focused && styles.focusedInput,
          this.props.style
        ]}
        onFocus={() => this.setState({focused: true})}
        onBlur={() => this.setState({focused: false})}
        underlineColorAndroid="transparent"
        />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 36,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.buttonSecondaryBg,
    borderRadius: 4,
  },
  focusedInput: {
    borderColor: Colors.tintColor,
  },
});
