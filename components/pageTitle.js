import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, GlobalStyles} from '../styles';

export default function PageTitle(props) {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    ...GlobalStyles.boxShadow,
    ...GlobalStyles.content,
    ...GlobalStyles.rounded,
    alignItems: 'center',
    backgroundColor: Colors.primary.white,
    justifyContent: 'center',
    height: 64,
    textAlign: 'center',
  },
  title: {
    color: Colors.primary.purple,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center'
  }
});
