import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import {Button, InfoBox, Input, PaginationDots, Popup} from '../../components';
import {GlobalStyles, Colors} from '../../styles';
import {Api, Realm, Strings} from '../../lib';

export default function SetYourStepTarget({navigation, route}) {
  const STEP_CHANGE = 500;
  const DAYS_CHANGE = 1;
  const stepInputRef = useRef(null);
  const daysInputRef = useRef(null);
  const [stepGoal, setStepGoal] = useState('5,000');
  const [daysGoal, setDaysGoal] = useState('5');
  const [isLoading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  function addNumberToString(str, num) {
    return (Number(str.replace(',', '')) + num).toLocaleString();
  }

  function subtractNumberFromString(str, num) {
    return (Number(str.replace(',', '')) - num).toLocaleString();
  }

  function onDecreaseSteps() {
    if (isLoading || stepGoal === STEP_CHANGE.toLocaleString()) {
      return;
    }

    setStepGoal(subtractNumberFromString(stepGoal, STEP_CHANGE));
  }

  function onIncreaseSteps() {
    if (isLoading) {
      return;
    }

    setStepGoal(addNumberToString(stepGoal, STEP_CHANGE));
  }

  function onDecreaseDays() {
    if (isLoading || daysGoal === DAYS_CHANGE.toString()) {
      return;
    }

    setDaysGoal(subtractNumberFromString(daysGoal, DAYS_CHANGE));
  }

  function onIncreaseDays() {
    if (isLoading || daysGoal === '7') {
      return;
    }

    setDaysGoal(addNumberToString(daysGoal, DAYS_CHANGE));
  }

  async function onNextPress() {
    setLoading(true);
    try {
      const user = await Realm.getUser();
      await Realm.write(() => {
        user.step_goal = stepGoal;
        user.days_goal = daysGoal;
      });
      await Api.appUser.update(user.id, {
        step_goal: user.step_goal,
        days_goal: user.days_goal,
      });
      setLoading(false);
      navigation.navigate('Info');
    } catch {
      setLoading(false);
      setAlertTitle(Strings.common.serverErrorTitle);
      setAlertMessage(Strings.common.serverErrorMessage);
      setShowAlert(true);
    }
  }

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
                <Text style={styles.inputHelpText}>
                  {Strings.setYourStepGoal.stepsPerDay}
                </Text>
                <TextInput
                  ref={stepInputRef}
                  style={styles.input}
                  value={stepGoal}
                  onChangeText={setStepGoal}
                  editable={false}
                />
              </View>
              <View style={styles.row}>
                <Button
                  style={styles.goalButton}
                  textStyle={styles.goalButtonText}
                  /* isEnabled={isValid()} */
                  onPress={onDecreaseSteps}>
                  {Strings.setYourStepGoal.decreaseSteps}
                </Button>
                <View style={styles.spacer} />
                <Button
                  style={styles.goalButton}
                  textStyle={styles.goalButtonText}
                  /* isEnabled={isValid()} */
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
              <View style={styles.inputBox}>
                <Text style={styles.inputHelpText}>
                  {Strings.setYourStepGoal.daysPerWeek}
                </Text>
                <TextInput
                  ref={daysInputRef}
                  style={styles.daysInput}
                  value={daysGoal}
                  onChangeText={setDaysGoal}
                  editable={false}
                />
              </View>
              <View style={styles.row}>
                <Button
                  style={styles.goalButton}
                  textStyle={styles.goalButtonText}
                  /* isEnabled={isValid()} */
                  onPress={onDecreaseDays}>
                  {Strings.setYourStepGoal.decreaseDays}
                </Button>
                <View style={styles.spacer} />
                <Button
                  style={styles.goalButton}
                  textStyle={styles.goalButtonText}
                  /* isEnabled={isValid()} */
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
              {Strings.common.next}
            </Button>
            <PaginationDots currentPage={6} totalPages={8} />
          </View>
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

const inputStyle = {
  ...GlobalStyles.rounded,
  width: 232,
  height: 56,
  backgroundColor: 'white',
  borderColor: Colors.primary.gray2,
  borderWidth: 0.5,
  marginBottom: 8,
  fontSize: 32,
  fontWeight: '500',
  paddingLeft: 12,
  paddingRight: 12,
  color: Colors.primary.gray2,
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
  goalButtonText: {
    color: Colors.primary.gray2,
    fontSize: 18,
    fontWeight: '600',
  },
  spacer: {
    width: 8,
  },
  button: {
    width: 180,
  },
  inputBox: {
    position: 'relative',
    alignItems: 'center',
  },
  inputHelpText: {
    position: 'absolute',
    top: 15,
    right: 5,
    zIndex: 10,
    fontSize: 24,
  },
  input: inputStyle,
  daysInput: {
    ...inputStyle,
    width: 153,
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 16,
  },
});
