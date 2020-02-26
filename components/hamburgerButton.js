import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, GlobalStyles} from '../styles';

export default function HamburgerButton(props) {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={() => props.onPress()}>
      <Icon name="menu" size={32} color={Colors.primary.purple} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
