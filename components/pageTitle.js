import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, GlobalStyles} from '../styles';

export default function PageTitle({style, title}) {
  return (
    <View style={{...style, ...styles.content}}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    backgroundColor: 'white',
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
