import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GlobalStyles, Colors} from '../styles';

export default function RecordedWalk(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row1}>
        <Text style={styles.mainTitle}>{props.title}</Text>
        {props.date &&
          <View style={styles.dateContainer}>
            <Text style={styles.statsTitle}>{props.date}</Text>
          </View>}
      </View>
      {props.steps === undefined ?
        <View style={styles.row2}>
          <Text style={styles.subtitle}>{props.subtitle}</Text>
        </View>
        :
        <>
          <View style={styles.row2}>
            <View style={styles.stats}>
              <Text style={styles.statsTitle}>{props.steps}</Text>
              <Text style={styles.subtitle}>steps</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.statsTitle}>{props.miles}</Text>
              <Text style={styles.subtitle}>miles</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.statsTitle}>{props.minutes}</Text>
              <Text style={styles.subtitle}>mins</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} name="timer" size={100} />
          </View>
        </>
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
  mainTitle: {
    color: Colors.primary.purple,
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsTitle: {
    color: Colors.primary.purple,
    fontSize: 16,
  },
  subtitle: {
    color: Colors.primary.purple,
    fontSize: 12.5,
  },
  dateContainer: {
    paddingLeft: 16,
    marginLeft: 16,
    borderLeftColor: Colors.primary.purple,
    borderLeftWidth: 1,
  },
  row1: {
    flexDirection: 'row',
    paddingLeft: 8,
    paddingTop: 8,
    flex: 1,
  },
  row2: {
    flexDirection: 'row',
    paddingLeft: 8,
    paddingTop: 4,
    width: 260,
    flex: 2,
    justifyContent: 'space-between',
  },
  stats: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  iconContainer: {
    position: 'absolute',
    right: 8,
    bottom: 4,
    height: 60,
  },
  icon: {
    color: '#BAA2C0',
    opacity: 0.25,
  },
});
