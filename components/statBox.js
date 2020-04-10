import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GlobalStyles} from '../styles';

export default function StatBox(props) {
  return (
    <View style={[styles.box, props.style, {backgroundColor: props.boxColor}]}>
      <View style={[styles.box, {width: '100%', overflow: 'hidden'}]}>
        <Text style={styles.mainText} textBreakStrategy="simple">{props.mainText}</Text>
        <Text style={styles.subText} textBreakStrategy="simple">{props.subText}</Text>
        <Icon
          style={[styles.icon, props.iconStyle]}
          name={props.icon}
          size={props.iconSize}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 112,
  },
  mainText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: 15,
  },
  subText: {
    color: 'white',
    fontSize: 18,
  },
  icon: {
    position: 'absolute',
    opacity: 0.15,
    color: 'white',
  },
});
