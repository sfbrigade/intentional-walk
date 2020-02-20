import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, GlobalStyles} from '../styles';

export default function InfoBox(props) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name={props.icon} size={props.iconSize} color={props.iconColor} />
      </View>
      <View style={styles.text}>
        { props.title ? (
          <Text style={GlobalStyles.h2}>{props.title}</Text>
        ) : null }
        <Text style={GlobalStyles.p2}>{props.children}</Text>
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
  }
});
