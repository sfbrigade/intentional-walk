import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GlobalStyles, Colors} from '../styles';

export default function RecordedWalk(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row1}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      {props.subtitle ?
        <View style={styles.row2}>
          <Text style={styles.subtitle}>{props.subtitle}</Text>
        </View>
        :
        <View style={styles.row2}> 
          <View style={styles.stats}></View>
          <View style={styles.stats}></View>
          <View style={styles.stats}></View>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.rounded,
    ...GlobalStyles.boxShadow,
    backgroundColor: 'white',
    height: 80,
  },
  title: {
    color: Colors.primary.purple,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.primary.purple,
    fontSize: 12.5,
    flex: 0.75,
  },
  row1: {
    flexDirection: 'row',
    paddingLeft: 8,
    paddingTop: 8,
  },
  row2: {
    flexDirection: 'row',
    paddingLeft: 8,
    paddingTop: 6,
  },
  stats: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    backgroundColor: 'blue',
  },
});
