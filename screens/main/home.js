'use strict';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import {
  AppState,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';

import {ENV_NAME} from '@env';

import {Api, Fitness, Realm, Strings} from '../../lib';
import {DateNavigator, Recorder} from '../../components';
import {GlobalStyles, Colors} from '../../styles';
import {StatBox, RecordedWalk} from '../../components';
import moment from 'moment';
import numeral from 'numeral';

export default function HomeScreen({navigation, route}) {
  const safeAreaInsets = useSafeArea();

  const appStateRef = useRef(AppState.currentState);
  const dateRef = useRef(moment().startOf('day'));
  const [date, setDate] = useState(dateRef.current);

  const [dailyWalks, setDailyWalks] = useState(null);
  const [todaysWalk, setTodaysWalk] = useState(null);
  const [totalSteps, setTotalSteps] = useState(null);

  const [contest, setContest] = useState(null);

  const [recordedWalks, setRecordedWalks] = useState(null);
  const [activeWalk, setActiveWalk] = useState(null);

  async function saveStepsAndDistances() {
    const newContest = await Realm.getContest();
    const today = moment().endOf('day');
    if (newContest) {
      let from = null;
      let to = null;
      /// check if we're in/after the contest period
      if (!newContest.isBeforeBaselineDate) {
        from = moment(newContest.startBaseline);
        /// check if we're in the contest period or the week after
        if (newContest.isAfterEndDate) {
          if (newContest.isWeekAfterEndDate) {
            to = moment(newContest.end);
          }
        } else {
          to = today;
        }
      }
      /// only save when within contest period
      if (from && to) {
        const newDailyWalks = await Fitness.getStepsAndDistances(from, to);
        if (newDailyWalks) {
          /// get user account, then save to server...!
          const user = await Realm.getUser();
          if (user) {
            try {
              await Api.dailyWalk.create(newDailyWalks, user.id);
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    }
  }

  const getStepsAndDistances = useCallback(async function (
    queryDate,
    currentDailyWalks,
  ) {
    // async function getStepsAndDistances(queryDate, currentDailyWalks) {
    setTodaysWalk(null);
    if (currentDailyWalks == null) {
      setDailyWalks(true);
      try {
        const newDailyWalks = await Fitness.getStepsAndDistances(
          moment(dateRef.current).startOf('month'),
          moment(dateRef.current).endOf('month'),
        );
        if (
          moment(dateRef.current)
            .startOf('month')
            .isSame(moment(queryDate).startOf('month'))
        ) {
          setDailyWalks(newDailyWalks);
          getStepsAndDistances(dateRef.current, newDailyWalks);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (Array.isArray(currentDailyWalks)) {
      let newTodaysWalk = {
        steps: 0,
        distance: 0,
      };
      let from = moment(queryDate).startOf('day');
      let to = moment(from).endOf('day');
      for (let dailyWalk of currentDailyWalks) {
        if (
          from.isSameOrBefore(dailyWalk.date) &&
          to.isSameOrAfter(dailyWalk.date)
        ) {
          newTodaysWalk = dailyWalk;
          break;
        }
      }
      setTodaysWalk(newTodaysWalk);
    }
  },
  []);

  async function getTotalSteps() {
    setTotalSteps(null);
    /// get current contest
    const newContest = await Realm.getContest();
    const now = moment();
    let from = null,
      to = null;
    /// check if we're in/outside the contest period
    if (newContest && newContest.isDuringContest) {
      /// get total from start of contest until now
      from = moment(newContest.start);
      to = now;
    } else {
      /// get total from start of month
      from = moment().startOf('month');
      to = now;
    }
    if (from && to) {
      let newTotalSteps = 0;
      try {
        const steps = await Fitness.getSteps(from, to);
        for (let step of steps) {
          newTotalSteps += step.quantity;
        }
      } finally {
        setTotalSteps(newTotalSteps);
      }
    } else {
      /// no range, just show 0
      setTotalSteps(0);
    }
  }

  async function getRecordedWalks(queryDate) {
    const realm = await Realm.open();
    const newRecordedWalks = realm
      .objects('IntentionalWalk')
      .filtered(
        'start>=$0 AND end<$1',
        queryDate.toDate(),
        moment(queryDate).add(1, 'd').toDate(),
      )
      .sorted([['end', true]]);
    if (dateRef.current.isSame(queryDate)) {
      setRecordedWalks(newRecordedWalks);
    }
  }

  function setDateAndGetDailySteps(newDate) {
    const oldDate = dateRef.current;
    dateRef.current = newDate;
    setDate(newDate);

    let newDailyWalks = dailyWalks;
    if (!oldDate.startOf('month').isSame(moment(newDate).startOf('month'))) {
      newDailyWalks = null;
    }
    getStepsAndDistances(newDate, newDailyWalks);
    getRecordedWalks(newDate);
  }

  const refresh = useCallback(
    function () {
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
    },
    [getStepsAndDistances],
  );

  /// one time setup for some data store listeners
  useEffect(() => {
    /// listen for an active walk
    let isFirstLoad = true;
    Realm.addCurrentWalkListener(walk => {
      setActiveWalk(walk);
      if (!isFirstLoad && walk == null) {
        /// if we've just finished a walk, then refresh to update step counts
        refresh();
      }
      isFirstLoad = false;
    });
    /// listen for updates to contest info
    Realm.addContestListener(newContest =>
      newContest ? setContest(newContest.toObject()) : null,
    );
    /// on cleanup, remove listeners
    return () => Realm.removeAllListeners();
  }, [refresh]);

  /// perform a bunch of other one-time checks/setup on app launch
  useEffect(() => {
    SplashScreen.hide();
    /// check for updated contest info
    Realm.updateContest();
    /// load settings
    Realm.getSettings()
      .then(settings => {
        // make sure we're in the same environment, otherwise "log out"
        if (settings.env !== ENV_NAME) {
          return Realm.destroyUser().then(() => Realm.getSettings());
        }
        return Promise.resolve(settings);
      })
      .then(settings => {
        const lang = settings.lang;
        if (lang) {
          /// set language preference, if any
          Strings.setLanguage(lang);
          /// recreate the date in the current locale
          moment.locale(lang);
          dateRef.current = moment(dateRef.current);
          setDate(dateRef.current);
        }
        return Realm.getUser();
      })
      .then(user => {
        /// if no user, go to onboarding flow
        if (!user) {
          navigation.navigate('OnboardingStack');
        } else if (!user.isSurveyCompleted) {
          navigation.navigate('OnboardingStack', {
            screen: 'LoHOrigin',
            params: {initial: true},
          });
        } else {
          refresh();
        }
      });
  }, [navigation, refresh]);

  useEffect(() => {
    if (route?.params?.refresh) {
      refresh();
    }
  }, [route, refresh]);

  const onAppStateChange = useCallback(
    function (newAppState) {
      if (
        appStateRef.current.match(/inactive|background/) &&
        newAppState === 'active'
      ) {
        refresh();
      }
      appStateRef.current = newAppState;
    },
    [refresh],
  );

  useEffect(() => {
    AppState.addEventListener('change', onAppStateChange);
    return () => {
      AppState.removeEventListener('change', onAppStateChange);
    };
  }, [onAppStateChange]);

  const today = moment().startOf('day');
  const isToday = date.isSame(today);

  return (
    <View style={GlobalStyles.container}>
      {!activeWalk && (
        <>
          <ScrollView>
            <View
              style={[
                GlobalStyles.content,
                {paddingBottom: safeAreaInsets.bottom + 20 + 17 + 10 + 54},
              ]}>
              <DateNavigator
                style={styles.marginBottom}
                date={date}
                setDate={setDateAndGetDailySteps}
              />
              {contest && contest.isBeforeStartDate && (
                <View style={styles.marginBottom}>
                  <Text style={styles.alertText}>
                    {Strings.home.getReadyAlert1}
                  </Text>
                  <Text style={styles.alertText}>
                    {Strings.formatString(
                      Strings.home.getReadyAlert2,
                      moment(contest.start).format(Strings.common.date),
                    )}
                  </Text>
                </View>
              )}
              {contest && contest.isDuringContest && (
                <View style={styles.marginBottom}>
                  <Text style={styles.alertText}>
                    {Strings.formatString(
                      Strings.home.currentAlert,
                      moment(contest.start).format(Strings.common.date),
                      moment(contest.end).format(Strings.common.date),
                    )}
                  </Text>
                </View>
              )}
              {contest && contest.isWeekAfterEndDate && (
                <View style={styles.marginBottom}>
                  <Text style={styles.alertText}>
                    {Strings.formatString(Strings.home.congratsAlert)}
                  </Text>
                </View>
              )}
              {contest &&
                contest.isAfterEndDate &&
                !contest.isWeekAfterEndDate && (
                  <View style={styles.marginBottom}>
                    <Text style={styles.alertText}>
                      {Strings.formatString(Strings.home.noContestAlert)}
                    </Text>
                  </View>
                )}
              <View style={styles.row}>
                <StatBox
                  mainText={
                    todaysWalk ? numeral(todaysWalk.steps).format('0,0') : ' '
                  }
                  subText={
                    isToday ? Strings.home.stepsToday : Strings.common.steps
                  }
                  icon="directions-walk"
                  iconSize={140}
                  iconStyle={styles.walkIcon}
                  style={[
                    styles.stepsBox,
                    styles.box,
                    isToday ? null : styles.stepsBoxRounded,
                  ]}
                  boxColor={Colors.accent.teal}
                />
                <StatBox
                  mainText={
                    todaysWalk
                      ? numeral(todaysWalk.distance * 0.000621371).format(
                          '0,0.0',
                        )
                      : ' '
                  }
                  mainTextSuffix={Strings.home.milesSuffix}
                  subText={
                    isToday ? Strings.home.milesToday : Strings.common.miles
                  }
                  icon="swap-calls"
                  iconSize={200}
                  iconStyle={styles.milesIcon}
                  style={[
                    styles.milesBox,
                    styles.box,
                    isToday ? null : styles.milesBoxRounded,
                  ]}
                  boxColor={Colors.primary.lightGreen}
                />
              </View>
              <View
                style={[styles.row, isToday ? null : styles.hidden]}
                pointerEvents={isToday ? 'auto' : 'none'}>
                <StatBox
                  mainText={
                    totalSteps != null ? numeral(totalSteps).format('0,0') : ' '
                  }
                  subText={
                    contest && contest.isDuringContest
                      ? Strings.home.overallStepTotal
                      : Strings.home.stepsThisMonth
                  }
                  icon="star-border"
                  iconSize={200}
                  style={[styles.overallBox, styles.box]}
                  boxColor={Colors.accent.orange}
                />
              </View>
              {contest &&
                (contest.isDuringContest || contest.isWeekAfterEndDate) && (
                  <View
                    style={[styles.row, isToday ? null : styles.hidden]}
                    pointerEvents={isToday ? 'auto' : 'none'}>
                    <TouchableOpacity
                      style={styles.box}
                      onPress={() => navigation.navigate('TopWalkers')}>
                      <View style={[styles.walkBox]}>
                        <Text style={styles.walkText}>
                          {Strings.home.topWalkers}
                        </Text>
                        <Icon
                          style={styles.walkChevron}
                          name="chevron-right"
                          size={30}
                        />
                        <Image
                          style={[styles.walkWatermark]}
                          source={require('../../assets/HomePageTopWalkers.png')}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              <View
                style={[styles.row, isToday ? null : styles.hidden]}
                pointerEvents={isToday ? 'auto' : 'none'}>
                <TouchableOpacity
                  style={styles.box}
                  onPress={() => navigation.navigate('WhereToWalk')}>
                  <View style={[styles.walkBox]}>
                    <Text style={styles.walkText}>
                      {Strings.home.whereToWalk}
                    </Text>
                    <Icon
                      style={styles.walkChevron}
                      name="chevron-right"
                      size={30}
                    />
                    <Image
                      style={[styles.walkWatermark, styles.walkWatermarkWhere]}
                      source={require('../../assets/HomePageWhereToWalk.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[styles.subtitle]}>
                <Text style={styles.subtitleHeader}>
                  {Strings.home.myRecordedWalks}
                </Text>
                <Text
                  style={styles.subtitleLink}
                  onPress={() => navigation.navigate('RecordedWalks')}>
                  {Strings.home.allRecordedWalks}
                </Text>
              </View>
              {recordedWalks && recordedWalks.length === 0 && (
                <RecordedWalk
                  title={
                    isToday ? Strings.common.noWalksYet : Strings.common.noWalks
                  }
                  subtitle={isToday ? Strings.home.noWalksYetText : null}
                />
              )}
              {recordedWalks &&
                recordedWalks.length > 0 &&
                recordedWalks.map(walk => (
                  <RecordedWalk key={walk.id} walk={walk} />
                ))}
            </View>
          </ScrollView>
          <View
            pointerEvents={isToday ? 'box-none' : 'none'}
            style={[
              styles.recordContainer,
              {paddingBottom: safeAreaInsets.bottom},
              isToday ? null : styles.hidden,
            ]}>
            <TouchableOpacity onPress={() => Realm.startWalk()}>
              <Image
                style={styles.recordButton}
                source={require('../../assets/record.png')}
              />
            </TouchableOpacity>
            <Text style={styles.recordText}>{Strings.home.recordAWalk}</Text>
          </View>
        </>
      )}
      {activeWalk && (
        <Recorder
          style={[styles.recorder, {paddingBottom: safeAreaInsets.bottom}]}
          activeWalk={activeWalk}
        />
      )}
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
  marginBottom: {
    marginBottom: 16,
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
  milesIcon: {
    top: -45,
    left: -15,
    width: '200%',
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
    minHeight: 64,
    height: 'auto',
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  walkIcon: {
    top: -15,
  },
  walkText: {
    ...GlobalStyles.h2,
    ...GlobalStyles.boxShadow,
    color: 'white',
    textAlign: 'left',
    paddingLeft: 20,
    height: 'auto',
    width: '90%',
    marginBottom: 0,
  },
  walkChevron: {
    color: 'white',
    paddingRight: 10,
  },
  walkWatermark: {
    position: 'absolute',
    right: 44,
    resizeMode: 'contain',
    width: '18%',
  },
  walkWatermarkWhere: {
    top: '-115%',
  },
  subtitle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 12,
  },
  subtitleHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.primary.gray2,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  subtitleLink: {
    fontSize: 12,
    color: Colors.primary.gray2,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
  },
  recorder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
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
    shadowOffset: {width: 0, height: 4},
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
    marginBottom: 10,
  },
  alertText: {
    color: Colors.secondary.red,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
