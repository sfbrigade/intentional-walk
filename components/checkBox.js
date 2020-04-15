import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors, GlobalStyles} from '../styles';
import {CheckBox} from 'react-native-elements';

export default function CustomCheckBox(props) {
  return (
    <View style={[styles.row, props.style]}>
      <CheckBox checked={props.checked}
                iconType="material"
                uncheckedIcon="check-box-outline-blank"
                checkedIcon="check-box"
                size={32}
                uncheckedColor={Colors.primary.purple}
                checkedColor={Colors.primary.purple}
                containerStyle={styles.container}
                onPress={() => props.onPress()} />
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
  }
});
