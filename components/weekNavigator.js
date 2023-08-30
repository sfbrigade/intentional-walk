import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, GlobalStyles} from '../styles';
import {Strings} from '../lib';
import _ from 'lodash';

export default function WeekNavigator(props) {
  const startOfWeek = moment().startOf('isoweek');
  const lastWeek = moment().startOf('isoweek').subtract(1, 'week');
  const startOfWeekProps = moment(props.date).startOf('isoweek');
  let title, prev, next;

  if (startOfWeekProps.isSame(startOfWeek)) {
    title = (
      <Text style={styles.title}>{Strings.stepGoalProgress.thisWeek}</Text>
    );
    next = null;
    prev = lastWeek;
  } else {
    title = (
      <Text style={styles.title}>{Strings.stepGoalProgress.pastWeek}</Text>
    );
    next = moment(startOfWeekProps).add(1, 'week');
    prev = moment(startOfWeekProps).subtract(1, 'week');
  }

  return (
    <View style={[styles.header]}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => props.setDate(prev)}>
        <Icon name="chevron-left" size={30} color="white" />
      </TouchableOpacity>
      <View>
        {title}
        <Text style={styles.subtitle}>
          {_.capitalize(moment(startOfWeekProps).format('MMM D'))} -{' '}
          {_.capitalize(startOfWeekProps.clone().weekday(7).format('MMM D'))}
        </Text>
      </View>
      <View style={styles.headerButton}>
        {next == null ? null : (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => props.setDate(next)}>
            <Icon name="chevron-right" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    ...GlobalStyles.rounded,
    ...GlobalStyles.boxShadow,
    backgroundColor: Colors.primary.purple,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    marginBottom: 12,
  },
  headerButton: {
    width: 64,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    color: 'white',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
  },
});
