import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Colors, GlobalStyles} from '../styles';
import {CheckBox} from 'react-native-elements';

export default function CustomCheckBox(props) {
  return (
    <CheckBox checked={props.checked}
              checkedIcon="check-square"
              uncheckedColor={Colors.primary.purple}
              checkedColor={Colors.primary.purple}
              containerStyle={[styles.container, props.style]}
              textStyle={styles.text}
              onPress={() => props.onPress()}
              title={props.title}
              />
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginBottom: 16,
  },
  text: {
    fontSize: 12,
    fontWeight: 'normal',
    color: Colors.primary.gray2
  }
});
