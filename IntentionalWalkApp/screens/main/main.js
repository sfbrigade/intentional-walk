'use strict'

import React, {useEffect, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Fitness from '../../lib/fitness';
import {DateNavigator} from '../../components';
import {GlobalStyles} from '../../styles';
import moment from 'moment';

export default function MainScreen({navigation}) {
  const dateRef = useRef(moment().startOf('day'));
  const [date, setDate] = useState(dateRef.current);
  const [dailySteps, setDailySteps] = useState(null);
  const [dailyDistance, setDailyDistance] = useState(null);
  const [totalSteps, setTotalSteps] = useState(null);

  const getDailySteps = (queryDate) => {
    setDailySteps(null);
    Fitness.getDailySteps(queryDate).then(steps => {
      if (dateRef.current.isSame(queryDate)) {
        setDailySteps(steps);
      }
    }).catch(error => {
      console.log(error);
    });
  };

  const getDailyDistance = (queryDate) => {
    setDailyDistance(null);
    Fitness.getDailyDistance(queryDate).then(distance => {
      if (dateRef.current.isSame(queryDate)) {
        setDailyDistance(distance);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  const setDateAndGetDailySteps = (newDate) => {
    const oldDate = dateRef.current;
    dateRef.current = newDate;
    setDate(newDate);
    getDailySteps(newDate);
    getDailyDistance(newDate);
    if (!oldDate.startOf('month').isSame(moment(newDate).startOf('month'))) {
      getTotalSteps();
    }
  };

  const getTotalSteps = () => {
    setTotalSteps(null);
    Fitness.getTotalSteps(moment(dateRef.current).startOf('month'), moment(dateRef.current).endOf('month')).then(steps => {
      setTotalSteps(steps);
    }).catch(error => {
      console.log(error);
    });
  }

  const refresh = () => {
    getDailySteps(dateRef.current);
    getDailyDistance(dateRef.current);
    getTotalSteps();
  };

  useEffect(() => {
    // navigation.navigate('OnboardingStack');
  }, [/* TODO: add state to check for account log in */]);

  // Do something when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      refresh();
      return () => { };
    }, [])
  );

  return (
    <View style={GlobalStyles.content}>
      <DateNavigator style={{marginBottom: 16}} date={date} setDate={setDateAndGetDailySteps}/>
      {dailySteps ? (
        <Text>Daily steps: {Math.round(dailySteps.quantity)} steps</Text>
      ) : (
        <Text>Querying daily step count...</Text>
      )}
      {dailyDistance ? (
        <Text>Daily distance: {dailyDistance.quantity / 1609.0} mi</Text>
      ) : (
        <Text>Querying daily distance...</Text>
      )}
      {totalSteps ? (
        <Text>Monthly steps: {Math.round(totalSteps.quantity)} steps</Text>
      ) : (
        <Text>Querying monthly step count...</Text>
      )}
    </View>
  );
}
