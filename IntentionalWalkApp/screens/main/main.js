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
    dateRef.current = newDate;
    getDailySteps(newDate);
    getDailyDistance(newDate);
  };

  const getTotalSteps = () => {
    setTotalSteps(null);
    const now = moment();
    Fitness.getTotalSteps(moment(now).startOf('month'), now).then(steps => {
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
    navigation.navigate('OnboardingStack');
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
      <DateNavigator style={{marginBottom: 16}} date={dateRef.current} setDate={setDateAndGetDailySteps}/>
      {dailySteps ? (
        <Text>Daily steps: {Math.round(dailySteps.quantity)}</Text>
      ) : (
        <Text>Querying daily step count...</Text>
      )}
      {dailyDistance ? (
        <Text>Daily distance: {dailyDistance.quantity / 1609.0} mi</Text>
      ) : (
        <Text>Querying daily distance...</Text>
      )}
      {totalSteps ? (
        <Text>Total steps: {Math.round(totalSteps.quantity)}</Text>
      ) : (
        <Text>Querying total step count...</Text>
      )}
    </View>
  );
}
