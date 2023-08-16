import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GlobalStyles} from '../styles';

export default function InfoBox(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.icon}>
        {props.icon && (
          <Icon
            name={props.icon}
            size={props.iconSize}
            color={props.iconColor}
            style={props.iconStyle}
          />
        )}
        {props.image && <Image source={props.image} style={props.imageStyle} />}
      </View>
      <View style={[styles.text, props.textStyle]}>
        {props.title ? (
          <Text style={GlobalStyles.h2}>{props.title}</Text>
        ) : null}
        {props.children && (
          <Text style={GlobalStyles.p2}>{props.children}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  icon: {
    width: 100,
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
});
