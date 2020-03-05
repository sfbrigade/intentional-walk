import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, GlobalStyles} from '../styles';

export default function DataBox(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>4,976</Text>
      <Text style={[styles.text, styles.subText]}>steps today</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.rounded,
    backgroundColor: Colors.primary.lightGreen,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 20,
  },
  icon: {
    width: 100,
    alignItems: 'center',
  },
});
