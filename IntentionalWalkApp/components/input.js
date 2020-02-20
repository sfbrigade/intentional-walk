import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, findNodeHandle} from 'react-native';
import {Colors, GlobalStyles} from '../styles';

export default function Input(props) {
  const prevFocusRef = useRef();
  const textInputRef = useRef(null);
  const [value, setValue] = useState(props.value || '');

  const onChangeText = newValue => {
    setValue(newValue);
    if (props.onChangeText) {
      props.onChangeText(newValue);
    }
  };

  useEffect(() => {
    if (prevFocusRef.current != props.focused && props.focused) {
      textInputRef.current.focus();
    }
    prevFocusRef.current = props.focused;
  });

  return (
    <TextInput ref={textInputRef}
               style={[styles.input, props.style, value != '' ? styles.inputFocused : {}]}
               onChangeText={(newValue) => onChangeText(newValue)}
               onSubmitEditing={(nativeEvent) => props.onSubmitEditing ? props.onSubmitEditing(nativeEvent) : null}
               placeholder={props.placeholder}
               placeholderColor={Colors.primary.gray2}
               autoCapitalize={props.autoCapitalize || 'none'}
               autoCompleteType={props.autoCompleteType || 'off'}
               keyboardType={props.keyboardType || 'default'}
               returnKeyType={props.returnKeyType || 'done'} />
  );
}
const styles = StyleSheet.create({
  input: {
    ...GlobalStyles.rounded,
    width: '100%',
    height: 56,
    backgroundColor: 'white',
    borderColor: Colors.primary.gray2,
    borderWidth: 0.5,
    marginBottom: 16,
    fontSize: 17,
    paddingLeft: 12,
    paddingRight: 12,
    color: Colors.primary.purple,
  },
  inputFocused: {
    borderColor: Colors.primary.purple,
  }
});
