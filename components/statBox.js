import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function StatBox(props) {
  return (
    <View style={[styles.box, props.style, {backgroundColor: props.boxColor}]}>
      <View style={[styles.box, styles.innerBox]}>
        {props.mainText === ' ' && (
          <ActivityIndicator
            style={styles.spinner}
            size="small"
            color="white"
          />
        )}
        <Text style={styles.mainText}>
          {props.mainText}
          {props.mainTextSuffix !== '' ? (
            <Text style={styles.subText}>{props.mainTextSuffix}</Text>
          ) : (
            ''
          )}
        </Text>
        <Text style={styles.subText}>{props.subText}</Text>
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
  innerBox: {
    width: '100%',
    overflow: 'hidden',
  },
  spinner: {
    position: 'absolute',
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
