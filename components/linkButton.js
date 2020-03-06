import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {Button} from './index';
import {Colors, GlobalStyles} from '../styles';

export default function LinkButton({title, url}) {
  return (
    <Button style={styles.content} onPress={() => {Linking.openURL(url)} }>{title}</Button>
  );
}

const styles = StyleSheet.create({
  content: {
    ...GlobalStyles.content,
    marginVertical: 8,
    height: 48,
  }
});
