import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../styles';
import {CheckBox} from 'react-native-elements';

export default function CustomCheckBox(props) {
  return (
    <View
      style={[styles.row, props.style]}
      pointerEvents={props.editable ? 'auto' : 'none'}>
      <CheckBox
        checked={props.checked}
        iconType="material"
        uncheckedIcon="check-box-outline-blank"
        checkedIcon="check-box"
        size={32}
        uncheckedColor={
          props.editable ? Colors.primary.purple : Colors.primary.gray2
        }
        checkedColor={
          props.editable ? Colors.primary.purple : Colors.primary.gray2
        }
        containerStyle={styles.container}
        onPress={() => props.onPress()}
      />
      {props.children}
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  container: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
});
