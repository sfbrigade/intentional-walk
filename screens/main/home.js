'use strict'

import React, {useEffect, useRef, useState} from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {ScrollView, StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import {Fitness, Realm, Strings} from '../../lib';
import {DateNavigator, Recorder} from '../../components';
import {GlobalStyles, Colors} from '../../styles';
import {StatBox, RecordedWalk} from '../../components';
import moment from 'moment';
import numeral from 'numeral';

export default function HomeScreen({navigation}) {
  const safeAreaInsets = useSafeArea();
  const dateRef = useRef(moment().startOf('day'));
  const [date, setDate] = useState(dateRef.current);
  const [dailySteps, setDailySteps] = useState(null);
  const [dailyDistance, setDailyDistance] = useState(null);
  const [totalSteps, setTotalSteps] = useState(null);
  const [recordedWalks, setRecordedWalks] = useState(null);
  const [activeWalk, setActiveWalk] = useState(false);

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
      const recordedWalks = realm.objects('IntentionalWalk')
        .filtered('start>=$0 AND end<$1', queryDate.toDate(), moment(queryDate).add(1, 'd').toDate())
        .sorted([['end', true]]);
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
    const listener = (results, changes) => setActiveWalk(results.length > 0 ? results[0] : null);
    let results = null;
    Realm.open().then(realm => {
      results = realm.objects('IntentionalWalk').filtered('end=null');
      results.addListener(listener);
    });
    return () => results ? results.removeListener(listener) : null;
  }, []);

  useEffect(() => {
    SplashScreen.hide();
    Realm.getSettings().then(settings => Strings.setLanguage(settings.lang));
    Realm.getUser().then(user => {
      if (!user) {
        navigation.navigate('OnboardingStack');
      }
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      refresh();
    }, [])
  );

  const today = moment().startOf('day');
  const dateString = date.isSame(today) ? Strings.common.today : date.format('MMMM D');

  return (
    <View style={{flex: 1}}>
      { !activeWalk &&
      <>
        <ScrollView>
          <View style={[GlobalStyles.content, {paddingBottom: safeAreaInsets.bottom + 20 + 17 + 10 + 54}]}>
            <DateNavigator style={{marginBottom: 16}} date={date} setDate={setDateAndGetDailySteps}/>
            <View style={styles.row}>
              <StatBox
                mainText={dailySteps ? numeral(dailySteps.quantity).format('0,0') : "*"}
                subText={Strings.home.stepsToday}
                icon="directions-walk"
                iconSize={170}
                iconStyle={{top: -20, right: -35}}
                style={styles.box}
                boxColor={Colors.accent.teal}
              />
              <StatBox
                mainText={dailyDistance ? numeral(dailyDistance.quantity / 1609.0).format('0,0.0') : "*"}
                subText={Strings.home.milesToday}
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
                  <Text style={styles.photoText}>{Strings.home.whereToWalk}</Text>
                </View>
              </TouchableOpacity>
              <StatBox
                mainText={totalSteps ? numeral(totalSteps.quantity).format('0,0') : "*"}
                subText={Strings.home.overallStepTotal}
                icon="star-border"
                iconSize={200}
                iconStyle={{top: -10, right: -30}}
                style={styles.box}
                boxColor={Colors.accent.orange}
              />
            </View>
            <View style={[styles.row, styles.subtitle]}>
              <Text style={styles.subtitleHeader}>{Strings.home.myRecordedWalks} {dateString}</Text>
              <Text style={styles.subtitleLink} onPress={() => navigation.navigate('RecordedWalks')}>{Strings.home.allRecordedWalks}</Text>
            </View>
            { recordedWalks && recordedWalks.length == 0 &&
              <RecordedWalk
                title={Strings.common.noWalksYet}
                subtitle={Strings.home.noWalksYetText} />
            }
            { recordedWalks && recordedWalks.length > 0 &&
                recordedWalks.map(walk => <RecordedWalk key={walk.id} walk={walk} />)
            }
          </View>
        </ScrollView>
        <View pointerEvents="box-none" style={[styles.recordContainer, {paddingBottom: safeAreaInsets.bottom}]}>
          <TouchableOpacity onPress={() => Realm.startWalk()}>
            <Image style={styles.recordButton} source={require('../../assets/record.png')} />
          </TouchableOpacity>
          <Text style={styles.recordText}>{Strings.home.recordAWalk}</Text>
        </View>
      </> }
      { activeWalk &&
        <Recorder
          style={[styles.recorder, {paddingBottom: safeAreaInsets.bottom}]}
          activeWalk={activeWalk} /> }
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
  },
  recorder: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  recordContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  recordButton: {
    width: 54,
    height: 54
  },
  recordText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.primary.purple,
    marginTop: 8,
    marginBottom: 20
  }
});
