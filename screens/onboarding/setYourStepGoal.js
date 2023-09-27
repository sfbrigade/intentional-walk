import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import {Button, InfoBox, PaginationDots, Popup} from '../../components';
import {GlobalStyles, Colors} from '../../styles';
import {Api, Realm, Strings} from '../../lib';
import {numberWithCommas} from '../../lib/util';

export default function SetYourStepTarget({navigation, route}) {
  const STEP_CHANGE = 500;
  const DAYS_CHANGE = 1;
  const DEFUALT_STEP_GOAL = 5000;
  const DEFAULT_DAYS_GOAL = 4;
  const stepInputRef = useRef(null);
  const daysInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [stepGoal, setStepGoal] = useState(null);
  const [daysGoal, setDaysGoal] = useState(null);
  const [isStepLowerLimit, setStepLowerLimit] = useState(false);
  const [isStepUpperLimit, setStepUpperLimit] = useState(false);
  const [isDaysLowerLimit, setDaysLowerLimit] = useState(false);
  const [isDaysUpperLimit, setDaysUpperLimit] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const stepGoalAndChangeEqual = stepGoal === STEP_CHANGE;
  const daysGoalAndChangeEqual = daysGoal === DAYS_CHANGE;

  function onDecreaseSteps() {
    if (loading || stepGoalAndChangeEqual) {
      return;
    }

    setStepGoal(stepGoal - STEP_CHANGE);
    setStepUpperLimit(false);
  }

  function onIncreaseSteps() {
    if (loading || stepGoal >= 99500) {
      return;
    }
    setStepGoal(stepGoal + STEP_CHANGE);
    setStepLowerLimit(false);
  }

  function onDecreaseDays() {
    if (loading || daysGoalAndChangeEqual) {
      return;
    }

    setDaysGoal(daysGoal - DAYS_CHANGE);
    setDaysUpperLimit(false);
  }

  function onIncreaseDays() {
    if (loading || daysGoal >= 7) {
      return;
    }

    setDaysGoal(daysGoal + DAYS_CHANGE);
    setDaysLowerLimit(false);
  }

  async function onNextPress() {
    setLoading(true);
    try {
      // create weekly goal
      const user = await Realm.getUser();
      const today = moment().format('YYYY-MM-DD');
      const weeklyGoal = {
        steps: stepGoal,
        days: daysGoal,
        start_of_week: today,
      };
      await Api.weeklyGoal.create(user.id, weeklyGoal);
      setLoading(false);
      if (route?.params?.fromProgress) {
        navigation.navigate('GoalProgress', {refresh: uuidv4()});
      } else {
        navigation.navigate('Info');
      }
    } catch {
      setLoading(false);
      setAlertTitle(Strings.common.serverErrorTitle);
      setAlertMessage(Strings.common.serverErrorMessage);
      setShowAlert(true);
    }
  }

  useEffect(() => {
    setLoading(true);
    // get current goal
    async function getWeeklyGoals() {
      const weeklyGoals = await Realm.getWeeklyGoals();
      if (weeklyGoals.length) {
        const goal = weeklyGoals[0];
        setStepGoal(goal.steps);
        setDaysGoal(goal.days);
      } else {
        setStepGoal(DEFUALT_STEP_GOAL);
        setDaysGoal(DEFAULT_DAYS_GOAL);
      }
      setLoading(false);
    }

    getWeeklyGoals();
  }, []);

  useEffect(() => {
    if (stepGoalAndChangeEqual) {
      setStepLowerLimit(true);
    }

    if (daysGoalAndChangeEqual) {
      setDaysLowerLimit(true);
    }

    if (daysGoal === 7) {
      setDaysUpperLimit(true);
    }

    if (stepGoal === 99500) {
      setStepUpperLimit(true);
    }
  }, [stepGoalAndChangeEqual, daysGoalAndChangeEqual, daysGoal, stepGoal]);

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView style={GlobalStyles.container}>
        <View style={GlobalStyles.content}>
          <Text style={GlobalStyles.h1}>{Strings.setYourStepGoal.header}</Text>
          <View style={styles.setYourStepGoal}>
            <Text style={styles.subtitle}>
              {Strings.setYourStepGoal.instructions}
            </Text>
            <InfoBox
              title={Strings.setYourStepGoal.stepText}
              style={styles.infoBox}
              textStyle={styles.infoBoxText}
              icon="directions-walk"
              iconSize={64}
              iconColor={Colors.primary.gray2}
            />
            <View style={styles.content}>
              <View style={styles.inputBox}>
                {Strings.setYourStepGoal.stepsPerDayBefore && (
                  <Text
                    style={[styles.inputHelpText, styles.inputHelpTextBefore]}>
                    {Strings.setYourStepGoal.stepsPerDayBefore}
                  </Text>
                )}
                <TextInput
                  ref={stepInputRef}
                  style={styles.input}
                  value={stepGoal ? numberWithCommas(stepGoal) : ''}
                  editable={false}
                />
                <Text style={styles.inputHelpText}>
                  {Strings.setYourStepGoal.stepsPerDay}
                </Text>
              </View>
              <View style={styles.row}>
                <Button
                  style={[
                    styles.goalButton,
                    isStepLowerLimit ? styles.disableGoalButton : {},
                  ]}
                  textStyle={[
                    styles.goalButtonText,
                    isStepLowerLimit ? styles.disableGoalButtonText : {},
                  ]}
                  onPress={onDecreaseSteps}>
                  {Strings.setYourStepGoal.decreaseSteps}
                </Button>
                <View style={styles.spacer} />
                <Button
                  style={[
                    styles.goalButton,
                    isStepUpperLimit ? styles.disableGoalButton : {},
                  ]}
                  textStyle={[
                    styles.goalButtonText,
                    isStepUpperLimit ? styles.disableGoalButtonText : {},
                  ]}
                  onPress={onIncreaseSteps}>
                  {Strings.setYourStepGoal.increaseSteps}
                </Button>
              </View>
            </View>
            <InfoBox
              title={Strings.setYourStepGoal.daysText}
              style={styles.infoBox}
              textStyle={styles.infoBoxText}
              icon="event-available"
              iconSize={64}
              iconColor={Colors.primary.gray2}
            />
            <View style={styles.content}>
              <View style={styles.inputDayBox}>
                {Strings.setYourStepGoal.daysPerWeekBefore && (
                  <Text
                    style={[styles.inputHelpText, styles.inputHelpTextBefore]}>
                    {Strings.setYourStepGoal.daysPerWeekBefore}
                  </Text>
                )}
                <TextInput
                  ref={daysInputRef}
                  style={styles.input}
                  value={daysGoal?.toString()}
                  editable={false}
                />
                <Text style={styles.inputHelpText}>
                  {daysGoal === 1
                    ? Strings.setYourStepGoal.dayPerWeek
                    : Strings.setYourStepGoal.daysPerWeek}
                </Text>
              </View>
              <View style={styles.row}>
                <Button
                  style={[
                    styles.goalButton,
                    isDaysLowerLimit ? styles.disableGoalButton : {},
                  ]}
                  textStyle={[
                    styles.goalButtonText,
                    isDaysLowerLimit ? styles.disableGoalButtonText : {},
                  ]}
                  onPress={onDecreaseDays}>
                  {Strings.setYourStepGoal.decreaseDays}
                </Button>
                <View style={styles.spacer} />
                <Button
                  style={[
                    styles.goalButton,
                    isDaysUpperLimit ? styles.disableGoalButton : {},
                  ]}
                  textStyle={[
                    styles.goalButtonText,
                    isDaysUpperLimit ? styles.disableGoalButtonText : {},
                  ]}
                  onPress={onIncreaseDays}>
                  {Strings.setYourStepGoal.increaseDays}
                </Button>
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <Button
              style={styles.button}
              /* isEnabled={isValid()} */
              onPress={onNextPress}>
              {route.params?.fromProgress
                ? Strings.common.save
                : Strings.common.next}
            </Button>
            {!route.params?.fromProgress ?? (
              <PaginationDots currentPage={6} totalPages={8} />
            )}
          </View>
          {loading && (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color={Colors.primary.purple} />
              <Text style={styles.loaderText}>{Strings.common.pleaseWait}</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <Popup isVisible={showAlert} onClose={() => setShowAlert(false)}>
        <View style={GlobalStyles.centered}>
          <Text style={GlobalStyles.h1}>{alertTitle}</Text>
          <Text style={[GlobalStyles.h2, styles.alertText]}>
            {alertMessage}
          </Text>
          <Button style={styles.button} onPress={() => setShowAlert(false)}>
            {Strings.common.okay}
          </Button>
        </View>
      </Popup>
    </SafeAreaView>
  );
}

const inputBoxStyle = {
  ...GlobalStyles.rounded,
  flex: 1,
  flexDirection: 'row',
  // justifyContent: 'space-between',
  alignItems: 'center',
  width: 240,
  height: 56,
  backgroundColor: 'white',
  borderColor: Colors.primary.gray2,
  borderWidth: 0.5,
  marginBottom: 8,
  paddingLeft: 12,
  paddingRight: 12,
};

const styles = StyleSheet.create({
  content: {
    ...GlobalStyles.content,
    alignItems: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 17,
    color: Colors.primary.gray2,
  },
  setYourStepGoal: {},
  infoBox: {
    marginBottom: 0,
  },
  infoBoxText: {
    marginTop: 20,
  },
  alertText: {
    textAlign: 'center',
    marginBottom: 48,
  },
  goalButton: {
    width: 127,
    backgroundColor: Colors.accent.yellow,
    height: 55,
  },
  disableGoalButton: {
    backgroundColor: Colors.accent.lightYellow,
  },
  goalButtonText: {
    color: Colors.primary.gray2,
    fontSize: 18,
    fontWeight: '600',
  },
  disableGoalButtonText: {
    color: Colors.primary.lightGray,
  },
  spacer: {
    width: 8,
  },
  button: {
    width: 180,
  },
  inputBox: {
    ...inputBoxStyle,
  },
  inputDayBox: {
    ...inputBoxStyle,
    width: 195,
  },
  inputHelpText: {
    color: Colors.primary.gray2,
    zIndex: 10,
    fontSize: 24,
    paddingLeft: 5,
  },
  inputHelpTextBefore: {
    paddingRight: 5,
  },
  input: {
    fontSize: 32,
    fontWeight: '500',
    color: Colors.primary.gray2,
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 16,
  },
  loader: {
    position: 'absolute',
    flexDirection: 'row',
    height: '100%',
    width: '105%',
    left: 16,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary.lightGray,
    borderRadius: 5,
    marginLeft: -10,
  },
  loaderText: {
    color: Colors.primary.purple,
    fontSize: 24,
    fontWeight: '500',
    marginLeft: 10,
  },
});
