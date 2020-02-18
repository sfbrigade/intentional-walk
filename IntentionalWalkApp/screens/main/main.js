'use strict'

import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Fitness from '@ovalmoney/react-native-fitness';
import {DateNavigator} from '../../components';
import {GlobalStyles} from '../../styles';
import moment from 'moment';

export default function MainScreen({navigation}) {
  const [date, setDate] = useState(moment().startOf('day'));
  const [steps, setSteps] = useState(null);
  const [authorized, setAuthorized] = useState(null);

  const getSteps = (date) => {
    setAuthorized(null);
    Fitness.isAuthorized().then((authorized) => {
      setAuthorized(authorized);
      if (authorized) {
        const from = date;
        const to = moment(date).add(1, 'days');
        setSteps(null);
        Fitness.getSteps({
          startDate: from.format('YYYY-MM-DD'),
          endDate: to.format('YYYY-MM-DD'),
          interval: 'days'
        }).then((steps) => {
          setSteps(steps);
        });
      }
    });
  };

  const setDateAndRefresh = (newDate) => {
    setDate(newDate);
    getSteps(newDate);
  }

  useEffect(() => {
    navigation.navigate('OnboardingStack');
  }, [/* TODO: add state to check for account log in */]);

  // Do something when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      getSteps(date);
      return () => { };
    }, [])
  );

  let results;
  if (steps == null) {
    results = <Text>Querying step count...</Text>;
  } else {
    results = steps.map((s) => <Text key={s.startDate}>{JSON.stringify(s)}</Text>);
  }

  return (
    <View style={GlobalStyles.content}>
      <DateNavigator style={GlobalStyles.content} date={date} setDate={setDateAndRefresh}/>
      { authorized === false ? (
        <Text>Fitness API access not authorized.</Text>
      ) : (authorized ? (
        results
      ) : null) }
    </View>
  );
}
