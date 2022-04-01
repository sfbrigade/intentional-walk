import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, GlobalStyles} from '../styles';
import {CheckBox} from 'react-native-elements';

export default function MultipleChoiceAnswer(props) {
  return (
    <TouchableOpacity
      style={[styles.row, props.style]}
      pointerEvents={props.editable ? 'auto' : 'none'}
      onPress={() => props.onPress()}>
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
      <View>
        <Text style={styles.text}>{props.text}</Text>
        {props.subText ? (
          <Text style={styles.subText}>{props.subText}</Text>
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 62,
    width: '100%',
    marginTop: 0,
    marginBottom: 2,
    paddingLeft: 14,
    borderRadius: GlobalStyles.rounded.borderRadius,
    backgroundColor: 'white',
    shadowColor: GlobalStyles.boxShadow.shadowColor,
    shadowOffset: GlobalStyles.boxShadow.shadowOffset,
    shadowOpacity: GlobalStyles.boxShadow.shadowOpacity,
    shadowRadius: GlobalStyles.boxShadow.shadowRadius,
    elevation: GlobalStyles.boxShadow.elevation,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
    color: Colors.primary.purple,
    paddingLeft: 12,
  },
  subText: {
    fontWeight: '500',
    fontSize: 17,
    color: Colors.primary.purple,
    paddingLeft: 12,
  },
});
