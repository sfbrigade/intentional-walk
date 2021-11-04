import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {GlobalStyles, Colors} from '../styles';

export default function Popup(props) {
  return (
    <View
      style={[
        styles.container,
        props.style,
        {
          display: props.isVisible ? 'flex' : 'none',
          position: props.isVisible ? 'absolute' : 'relative',
        },
      ]}>
      <TouchableOpacity onPress={props.onClose} style={styles.backdrop} />
      <View style={styles.box}>
        <TouchableOpacity onPress={props.onClose} style={styles.closeIcon}>
          <Icon name="clear" size={24} color={Colors.primary.gray2} />
        </TouchableOpacity>
        <View style={styles.content}>{props.children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.primary.gray2,
    opacity: 0.4,
    width: '100%',
    height: '100%',
  },
  box: {
    ...GlobalStyles.boxShadow,
    shadowOpacity: 0.25,
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    padding: 2,
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  content: {
    padding: 8,
  },
});
