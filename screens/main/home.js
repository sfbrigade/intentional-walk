'use strict'

import React, {useEffect, useRef, useState} from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {ScrollView, StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen'
import {Api, Fitness, Realm, Strings} from '../../lib';
import {DateNavigator, Recorder} from '../../components';
import {GlobalStyles, Colors} from '../../styles';
import {StatBox, RecordedWalk} from '../../components';
import moment from 'moment';
import numeral from 'numeral';

export default function HomeScreen({navigation}) {
  const safeAreaInsets = useSafeArea();

  const dateRef = useRef(moment().startOf('day'));
  const [date, setDate] = useState(dateRef.current);

  const [dailyWalks, setDailyWalks] = useState(null);
  const [todaysWalk, setTodaysWalk] = useState(null);
  const [totalSteps, setTotalSteps] = useState(null);

  const [contest, setContest] = useState(null);

  const [recordedWalks, setRecordedWalks] = useState(null);
  const [activeWalk, setActiveWalk] = useState(false);

  const saveStepsAndDistances = () => {
    Realm.getContest().then(contest => {
        const today = moment().startOf('day');
        let from = null, to = null;
        if (contest) {
          /// check if we're in/after the contest period
          if (!contest.isBeforeStartDate) {
            from = moment(contest.start);
            /// check if we're in the contest period
            if (contest.isAfterEndDate) {
              to = moment(contest.end);
            } else {
              to = today;
            }
          }
        }
        /// only save when within contest period
        if (from && to) {
          Fitness.getStepsAndDistances(moment(dateRef.current).startOf('month'), moment(dateRef.current).endOf('month'))
            .then(dailyWalks => {
              if (dailyWalks && dailyWalks.length > 0) {
                /// get user account, then save to server...!
                Realm.getUser()
                  .then(user => {
                    if (user) {
                      return Api.dailyWalk.create(dailyWalks, user.id);
                    }
                  })
                  .then(response => {
                    /// silent for now
                  })
                  .catch(error => {
                    /// silent for now- send to remote logger (Firebase?)
                  });
              }
            });
        }
      });
  };

  const getStepsAndDistances = (queryDate, dailyWalks) => {
    setTodaysWalk(null);
    if (dailyWalks == null) {
      setDailyWalks(true);
      Fitness.getStepsAndDistances(moment(dateRef.current).startOf('month'), moment(dateRef.current).endOf('month'))
        .then(dailyWalks => {
          if (moment(dateRef.current).startOf('month').isSame(moment(queryDate).startOf('month'))) {
            setDailyWalks(dailyWalks);
            getStepsAndDistances(dateRef.current, dailyWalks);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else if (Array.isArray(dailyWalks)) {
      let todaysWalk = {
        steps: 0,
        distance: 0,
      };
      let from = moment(queryDate).startOf('day');
      let to = moment(from).endOf('day');
      for (let dailyWalk of dailyWalks) {
        if (from.isSameOrBefore(dailyWalk.date) && to.isSameOrAfter(dailyWalk.date)) {
          todaysWalk = dailyWalk;
          break;
        }
      }
      setTodaysWalk(todaysWalk);
    }
  }

  const getTotalSteps = () => {
    setTotalSteps(null);
    /// get current contest
    Realm.getContest().then(contest => {
        const now = moment();
        let from = null, to = null;
        /// check if we're in/outside the contest period
        if (contest && contest.isDuringContest) {
          /// get total from start of contest until now
          from = moment(contest.start);
          to = now;
        } else {
          /// get total from start of month
          from = moment().startOf('month');
          to = now;
        }
        return [from, to];
      })
      .then(([from, to]) => {
        if (from && to) {
          let totalSteps = 0;
          Fitness.getSteps(from, to).then(steps => {
            for (let step of steps) {
              totalSteps += step.quantity;
            }
          }).finally(() => setTotalSteps(totalSteps));
        } else {
          /// no range, just show 0
          setTotalSteps(0);
        }
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
  };

  const setDateAndGetDailySteps = (newDate) => {
    const oldDate = dateRef.current;
    dateRef.current = newDate;
    setDate(newDate);

    let newDailyWalks = dailyWalks;
    if (!oldDate.startOf('month').isSame(moment(newDate).startOf('month'))) {
      newDailyWalks = null;
    }
    getStepsAndDistances(newDate, newDailyWalks);
    getRecordedWalks(newDate);
  };

  const refresh = () => {
    const today = moment().startOf('day');
    dateRef.current = moment(dateRef.current);
    if (dateRef.current.isAfter(today)) {
      dateRef.current = today;
    }
    setDate(dateRef.current);
    getStepsAndDistances(dateRef.current, null);
    getTotalSteps();
    getRecordedWalks(dateRef.current);
    saveStepsAndDistances();
  };

  /// one time setup for some data store listeners
  useEffect(() => {
    /// listen for an active walk
    Realm.addCurrentWalkListener(walk => setActiveWalk(walk));
    /// listen for updates to contest info
    Realm.addContestListener(contest => contest ? setContest(contest.toObject()) : null);
    /// on cleanup, remove listeners
    return () => Realm.removeAllListeners();
  }, []);

  /// perform a bunch of other one-time checks/setup on app launch
  useEffect(() => {
    SplashScreen.hide();
    /// load settings
    Realm.getSettings().then(settings => {
      const lang = settings.lang;
      if (lang) {
        /// set language preference, if any
        Strings.setLanguage(lang);
        /// recreate the date in the current locale
        moment.locale(lang);
        dateRef.current = moment(dateRef.current);
        setDate(dateRef.current);
      }
    });
    /// get signed in user, if any
    Realm.getUser().then(user => {
      /// if no user, go to onboarding flow
      if (!user) {
        navigation.navigate('OnboardingStack');
      }
    });
    /// check for updated contest info
    Realm.updateContest();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      refresh();
    }, [])
  );

  const today = moment().startOf('day');
  const isToday = date.isSame(today);
  const dateString = isToday ? Strings.common.today : date.format('MMMM D');

  return (
    <View style={GlobalStyles.container}>
      { !activeWalk &&
      <>
        <ScrollView>
          <View style={[GlobalStyles.content, {paddingBottom: safeAreaInsets.bottom + 20 + 17 + 10 + 54}]}>
            <DateNavigator style={{marginBottom: 16}} date={date} setDate={setDateAndGetDailySteps}/>
            { contest && contest.isBeforeStartDate && <View style={{marginBottom: 16}}>
              <Text style={styles.alertText}>{Strings.home.getReadyAlert1}</Text>
              <Text style={styles.alertText}>{Strings.formatString(Strings.home.getReadyAlert2, moment(contest.start).format(Strings.common.date))}</Text>
            </View> }
            <View style={styles.row}>
              <StatBox
                mainText={todaysWalk ? numeral(todaysWalk.steps).format('0,0') : " "}
                subText={isToday ? Strings.home.stepsToday : Strings.common.steps}
                icon="directions-walk"
                iconSize={140}
                iconStyle={{top: -15}}
                style={[styles.stepsBox, styles.box, isToday ? null : styles.stepsBoxRounded]}
                boxColor={Colors.accent.teal}
              />
              <StatBox
                mainText={todaysWalk ? numeral(todaysWalk.distance * 0.000621371).format('0,0.0') : " "}
                mainTextSuffix={Strings.home.milesSuffix}
                subText={isToday ? Strings.home.milesToday : Strings.common.miles}
                icon="swap-calls"
                iconSize={200}
                iconStyle={{top: -45, left: -15, width: '200%'}}
                style={[styles.milesBox, styles.box, isToday ? null : styles.milesBoxRounded]}
                boxColor={Colors.primary.lightGreen}
              />
            </View>
            <View style={[styles.row, isToday ? null : styles.hidden]} pointerEvents={isToday? 'auto' : 'none'}>
              <StatBox
                mainText={totalSteps != null ? numeral(totalSteps).format('0,0') : " "}
                subText={contest.isDuringContest ? Strings.home.overallStepTotal : Strings.home.stepsThisMonth}
                icon="star-border"
                iconSize={200}
                style={[styles.overallBox, styles.box]}
                boxColor={Colors.accent.orange}
              />
            </View>
            <View style={[styles.row, isToday ? null : styles.hidden]} pointerEvents={isToday? 'auto' : 'none'}>
              <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('WhereToWalk')}>
                <View style={styles.walkBox}>
                  <Text style={styles.walkText} textBreakStrategy="simple">{Strings.home.whereToWalk}</Text>
                  <Icon style={styles.walkChevron} name="chevron-right" size={30} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.subtitle]}>
              <Text style={styles.subtitleHeader} textBreakStrategy="simple">{Strings.home.myRecordedWalks}</Text>
              <Text style={styles.subtitleLink} onPress={() => navigation.navigate('RecordedWalks')} textBreakStrategy="simple">{Strings.home.allRecordedWalks}</Text>
            </View>
            { recordedWalks && recordedWalks.length == 0 &&
              <RecordedWalk
                title={isToday ? Strings.common.noWalksYet : Strings.common.noWalks}
                subtitle={isToday ? Strings.home.noWalksYetText : null} />
            }
            { recordedWalks && recordedWalks.length > 0 &&
                recordedWalks.map(walk => <RecordedWalk key={walk.id} walk={walk} />)
            }
          </View>
        </ScrollView>
        <View pointerEvents={isToday ? 'box-none' : 'none'} style={[styles.recordContainer, {paddingBottom: safeAreaInsets.bottom}, isToday ? null : styles.hidden]}>
          <TouchableOpacity onPress={() => Realm.startWalk()}>
            <Image style={styles.recordButton} source={require('../../assets/record.png')} />
          </TouchableOpacity>
          <Text style={styles.recordText} textBreakStrategy="simple">{Strings.home.recordAWalk}</Text>
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
  },
  hidden: {
    opacity: 0,
  },
  box: {
    flex: 1,
  },
  stepsBox: {
    borderTopLeftRadius: 10,
  },
  stepsBoxRounded: {
    borderBottomLeftRadius: 10,
  },
  milesBox: {
    borderTopRightRadius: 10,
  },
  milesBoxRounded: {
    borderBottomRightRadius: 10,
  },
  overallBox: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 16,
  },
  walkBox: {
    ...GlobalStyles.rounded,
    ...GlobalStyles.boxShadow,
    backgroundColor: Colors.primary.purple,
    height: 64,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  walkText: {
    ...GlobalStyles.h2,
    ...GlobalStyles.boxShadow,
    color: 'white',
    textAlign: 'left',
    paddingLeft: 20,
    marginBottom: 0
  },
  walkChevron: {
    color: 'white',
    paddingRight: 10,
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
    color: Colors.primary.gray2,
    alignSelf: 'flex-start',
    marginBottom: 4
  },
  subtitleLink: {
    fontSize: 12,
    color: Colors.primary.gray2,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end'
  },
  recorder: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  recordContainer: {
    position: 'absolute',
    backgroundColor: Colors.primary.lightGray,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  recordButton: {
    width: 54,
    height: 54,
    marginTop: 10,
  },
  recordText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary.purple,
    marginTop: 8,
    marginBottom: 10
  },
  alertText: {
    color: Colors.secondary.red,
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    textAlign: 'center'
  }
});
