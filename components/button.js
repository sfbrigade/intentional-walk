import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Colors, GlobalStyles} from '../styles';

export default function Button(props) {
  return (
    <TouchableOpacity
      style={[styles.button, props.style, props.isToggle && !props.isSelected ? styles.buttonToggle : {}, props.isEnabled === false ? styles.buttonDisabled : {}]}
      disabled={props.isEnabled === false}
      onPress={() => props.onPress()}>
      {React.Children.map(props.children, c => typeof c === 'string' ? (
        <Text style={[styles.text, props.isToggle && !props.isSelected ? styles.textToggle: {}]}>{c}</Text>
      ) : c)}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    ...GlobalStyles.rounded,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
    height: 48,
    marginBottom: 16,
  },
  buttonToggle: {
    backgroundColor: 'white',
    borderColor: Colors.primary.purple,
    borderWidth: 0.5,
  },
  buttonDisabled: {
    borderWidth: 0,
    backgroundColor: '#DADADA',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  textToggle: {
    color: Colors.primary.purple,
  }
});
