import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, GlobalStyles} from '../styles';

export default function DataBox(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>4,976</Text>
      <Text style={styles.subText}>steps today</Text>
      <Icon style={styles.icon} name='directions-walk' size={170} color='white'/>
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
    height: 140,
    width: 180,
  },
  mainText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  subText: {
    color: 'white',
    fontSize: 20,
  },
  icon: {
    position: 'absolute',
    opacity: 0.15,
    top: -20,
    right: -50,
  },
});
