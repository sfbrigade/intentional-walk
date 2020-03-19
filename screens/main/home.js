'use strict'

import React, {useEffect, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import {Fitness, Realm} from '../../lib';
import {DateNavigator} from '../../components';
import {GlobalStyles, Colors} from '../../styles';
import {StatBox, RecordedWalk} from '../../components';
import moment from 'moment';
import numeral from 'numeral';

export default function HomeScreen({navigation}) {
  const dateRef = useRef(moment().startOf('day'));
  const [date, setDate] = useState(dateRef.current);
  const [dailySteps, setDailySteps] = useState(null);
  const [dailyDistance, setDailyDistance] = useState(null);
  const [totalSteps, setTotalSteps] = useState(null);
  const [recordedWalks, setRecordedWalks] = useState(null);

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

  const getRecordedWalks = (queryDate) => {
    Realm.open().then(realm => {
      const recordedWalks = realm.objects('IntentionalWalk').filtered('start>=$0 AND end<$1', queryDate.toDate(), moment(queryDate).add(1, 'd').toDate());
      if (dateRef.current.isSame(queryDate)) {
        setRecordedWalks(recordedWalks);
      }
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
    getRecordedWalks(newDate);
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
    getRecordedWalks(dateRef.current);
  };

  useEffect(() => {
    SplashScreen.hide();
    Realm.open().then(realm => {
      let users = realm.objects('AppUser');
      if (users.length == 0) {
        navigation.navigate('OnboardingStack');
      }
    })
  }, []);

  // Do something when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      refresh();
      return () => { };
    }, [])
  );

  const today = moment().startOf('day');
  const dateString = date.isSame(today) ? 'Today' : date.format('MMMM D');

  return (
    <View style={GlobalStyles.content}>
      <DateNavigator style={{marginBottom: 16}} date={date} setDate={setDateAndGetDailySteps}/>
      <View style={styles.row}>
        <StatBox
          mainText={dailySteps ? numeral(dailySteps.quantity).format('0,0') : "*"}
          subText="steps today"
          icon="directions-walk"
          iconSize={170}
          iconStyle={{top: -20, right: -35}}
          style={styles.box}
          boxColor={Colors.accent.teal}
        />
        <StatBox
          mainText={dailyDistance ? numeral(dailyDistance.quantity / 1609.0).format('0,0.0') : "*"}
          subText="miles today"
          icon="swap-calls"
          iconSize={240}
          iconStyle={{top: -30, left: -40, width: '200%'}}
          style={styles.box}
          boxColor={Colors.primary.lightGreen}
        />
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('WhereToWalk')}>
          <View style={styles.photoBox}>
            <Image style={styles.photo} source={require('../../assets/dolorespark.jpg')} />
            <Text style={styles.photoText}>Where to Walk?</Text>
          </View>
        </TouchableOpacity>
        <StatBox
          mainText={totalSteps ? numeral(totalSteps.quantity).format('0,0') : "*"}
          subText="overall step total"
          icon="star-border"
          iconSize={200}
          iconStyle={{top: -10, right: -30}}
          style={styles.box}
          boxColor={Colors.accent.orange}
        />
      </View>
      <View style={[styles.row, styles.subtitle]}>
        <Text style={styles.subtitleHeader}>My Recorded Walks {dateString}</Text>
        <Text style={styles.subtitleLink} onPress={() => navigation.navigate('RecordedWalks')}>All Recorded Walks</Text>
      </View>
      { recordedWalks && recordedWalks.length == 0 &&
        <RecordedWalk
          title="No Walks Yet"
          subtitle="Start a new walk by pressing the record button at the bottom of the screen." />
      }
      { recordedWalks && recordedWalks.length > 0 &&
          recordedWalks.map(walk => <RecordedWalk walk={walk} />)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginLeft: -8,
    marginRight: -8,
    marginBottom: 16,
  },
  box: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  photoBox: {
    ...GlobalStyles.rounded,
    ...GlobalStyles.boxShadow,
  },
  photo: {
    ...GlobalStyles.rounded,
    resizeMode: 'cover',
    width: '100%',
    height: 140,
    position: 'absolute',
  },
  photoText: {
    ...GlobalStyles.h2,
    ...GlobalStyles.boxShadow,
    color: 'white',
    textAlign: 'center',
    marginTop: 20
  },
  subtitle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 12
  },
  subtitleHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.primary.gray2
  },
  subtitleLink: {
    fontSize: 12,
    color: Colors.primary.gray2,
    textDecorationLine: 'underline'
  }
});
