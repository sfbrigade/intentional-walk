import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors, GlobalStyles} from '../styles';

export default function Logo(props) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>iWalk</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...GlobalStyles.logoFont,
    color: Colors.primary.purple,
    fontSize: 20,
    textAlign: 'center',
  },
});
