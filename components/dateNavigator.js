import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import Moment from 'react-moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, GlobalStyles} from '../styles';

export default function DateNavigator(props) {
  const today = moment().startOf('day');
  const yesterday = moment().startOf('day').subtract(1, 'days');
  let title, prev, next;
  if (props.date.isSame(today)) {
    title = <Text style={styles.title}>Today</Text>;
    next = null;
    prev = yesterday;
  } else if (props.date.isSame(yesterday)) {
    title = <Text style={styles.title}>Yesterday</Text>;
    next = today;
    prev = moment().startOf('day').subtract(2, 'days');
  } else {
    title = <Moment style={styles.title} element={Text} date={props.date} format="dddd" />;
    next = moment(props.date).add(1, 'day');
    prev = moment(props.date).subtract(1, 'day');
  }
  return (
    <View style={[styles.header, props.style]}>
      <TouchableOpacity style={styles.headerButton} onPress={() => props.setDate(prev)}>
        <Icon name="chevron-left" size={30} color="white" />
      </TouchableOpacity>
      <View>
        {title}
        <Moment style={styles.subtitle} element={Text} date={props.date} format="MMMM D" />
      </View>
      <View style={styles.headerButton}>
        {next == null ? null : (
          <TouchableOpacity style={styles.headerButton} onPress={() => props.setDate(next)}>
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
