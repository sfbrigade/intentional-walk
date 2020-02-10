import React, {useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Fitness from '@ovalmoney/react-native-fitness';

export default function MainScreen({navigation}) {
  const [steps, setSteps] = useState(null);

  useEffect(() => {
    navigation.navigate('OnboardingStack');
  }, [/* TODO: add state to check for account log in */]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      const now = new Date();
      const yest = new Date()
      yest.setDate(now.getDate() - 1);
      Fitness.getSteps({
        startDate: yest.toISOString().slice(0,10),
        endDate: now.toISOString().slice(0,10),
        interval: 'days'
      }).then((steps) => {
        console.log(steps);
        let latest = null;
        for (step of steps) {
          step.endDate = new Date(step.endDate);
          if (latest == null || step.endDate > latest.endDate) {
            latest = step;
          }
        }
        if (latest) {
          setSteps(latest.quantity);
        }
      });
      return () => { };
    }, [])
  );

  return (
    <View>
      <Text>{steps} steps</Text>
    </View>
  );
}
