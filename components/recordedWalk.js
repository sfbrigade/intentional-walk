import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GlobalStyles, Colors} from '../styles';
import {Strings} from '../lib';
import moment from 'moment';
import numeral from 'numeral';

export default function RecordedWalk(props) {
  let {title, date, subtitle, steps, miles, minutes} = props;
  const walk = props.walk;
  if (walk) {
    title = walk.timeOfWalk;
    const start = moment(walk.start);
    const today = moment().startOf('day');
    const yesterday = moment(today).subtract(1, 'd');
    if (start.isSameOrAfter(today)) {
      date = Strings.common.today;
    } else if (start.isSameOrAfter(yesterday)) {
      date = Strings.common.yesterday;
    } else {
      date = start.format('MMM D');
    }
    steps = numeral(walk.steps).format('0,0');
    miles = numeral(walk.distance * 0.000621371).format('0,0.0');
    minutes = Math.round(walk.elapsedTime / 60.0);
  }
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.clipContainer}>
        <View style={styles.row1}>
          <Text style={styles.mainTitle}>{title}</Text>
          {date && (
            <View style={styles.dateContainer}>
              <Text style={[styles.statsTitle, styles.date]}>{date}</Text>
            </View>
          )}
        </View>
        {steps === undefined ? (
          <View style={styles.row2}>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        ) : (
          <>
            <View style={[styles.row2, styles.row2Padded]}>
              <View style={styles.stats}>
                <Text style={styles.statsTitle}>{steps}</Text>
                <Text style={styles.subtitle}>{Strings.common.steps}</Text>
              </View>
              <View style={styles.stats}>
                <Text style={styles.statsTitle}>{miles}</Text>
                <Text style={styles.subtitle}>{Strings.common.miles}</Text>
              </View>
              <View style={styles.stats}>
                <Text style={styles.statsTitle}>{minutes}</Text>
                <Text style={styles.subtitle}>{Strings.common.mins}</Text>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <Icon style={styles.icon} name="timer" size={100} />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.rounded,
    ...GlobalStyles.boxShadow,
    backgroundColor: 'white',
    height: 80,
    marginBottom: 16,
  },
  clipContainer: {
    flex: 1,
    overflow: 'hidden',
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
  date: {
    textAlign: 'right',
  },
  subtitle: {
    color: Colors.primary.purple,
    fontSize: 12.5,
  },
  dateContainer: {
    paddingLeft: 16,
    marginLeft: 16,
    marginRight: 100,
    borderLeftColor: Colors.primary.purple,
    borderLeftWidth: 1,
    minWidth: 90,
  },
  row1: {
    flexDirection: 'row',
    paddingLeft: 8,
    paddingTop: 8,
    flex: 1,
    justifyContent: 'space-between',
  },
  row2: {
    flexDirection: 'row',
    paddingLeft: 8,
    paddingTop: 4,
    flex: 2,
    justifyContent: 'space-between',
  },
  row2Padded: {
    paddingRight: 100,
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
