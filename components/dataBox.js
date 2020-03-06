import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, GlobalStyles} from '../styles';

export default function DataBox(props) {
  return (
    <View style={[styles.box, props.boxStyle]}>
      <Text style={styles.mainText}>{props.mainText}</Text>
      <Text style={styles.subText}>{props.subText}</Text>
      <Icon
        style={[styles.icon, props.iconStyle]}
        name={props.icon}
        size={props.iconSize}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    ...GlobalStyles.rounded,
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    width: 180,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
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
    color: 'white',
  },
});
