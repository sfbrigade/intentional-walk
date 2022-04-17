import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors, GlobalStyles} from '../styles';

export default function Button(props) {
  function onLayout({nativeEvent}) {
    if (props.onHeight) {
      props.onHeight(nativeEvent.layout.height);
    }
  }
  return (
    <TouchableOpacity
      style={[
        styles.button,
        props.style,
        props.isToggle && !props.isSelected ? styles.buttonToggle : {},
        props.isEnabled === false ? styles.buttonDisabled : {},
      ]}
      disabled={props.isEnabled === false}
      onLayout={onLayout}
      onPress={() => props.onPress()}>
      {React.Children.map(props.children, c =>
        typeof c === 'string' ? (
          <Text
            style={[
              styles.text,
              props.textStyle,
              props.isToggle && !props.isSelected ? styles.textToggle : {},
            ]}>
            {c}
          </Text>
        ) : (
          c
        ),
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    ...GlobalStyles.rounded,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
    minHeight: 48,
    marginBottom: 16,
    padding: 10,
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
    lineHeight: 28,
    fontWeight: '500',
    textAlign: 'center',
  },
  textToggle: {
    color: Colors.primary.purple,
  },
});
