import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import upperCase from 'lodash/upperCase';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../styles';
import {Strings} from '../lib';
import {numberWithCommas} from '../lib/util';

export default function GoalBox(props) {
  const navigation = useNavigation();
  const [progressText, setProgressText] = useState(null);
  const [progressClass, setProgressClass] = useState(null);

  useEffect(() => {
    if (props.loadingSteps) {
      return;
    }
    const progressTextTemp = props.goalMet
      ? Strings.stepGoalProgress.goalMet
      : props.cantMeetGoal
      ? Strings.stepGoalProgress.goalNotMet
      : props.inProgress
      ? Strings.stepGoalProgress.inProgress
      : Strings.stepGoalProgress.goalNotMet;
    const progressClassTemp = props.goalMet
      ? 'goalMet'
      : props.cantMeetGoal
      ? 'goalNotMet'
      : props.inProgress
      ? 'inProgress'
      : 'goalNotMet';

    setProgressText(progressTextTemp);
    setProgressClass(progressClassTemp);
  }, [props.goalMet, props.inProgress, props.cantMeetGoal, props.loadingSteps]);

  return (
    <View style={styles.box}>
      <View style={[styles.box, styles.innerBox]}>
        <Text style={styles.myGoal}>
          {upperCase(Strings.stepGoalProgress.myGoal)}
        </Text>
        <View style={styles.goalRow}>
          {props?.goal?.steps && (
            <>
              <Text style={styles.mainText}>
                {Strings.setYourStepGoal.stepsPerDayBefore &&
                  Strings.setYourStepGoal.stepsPerDayBefore + ' '}
                {numberWithCommas(props.goal.steps)}{' '}
                {Strings.setYourStepGoal.stepsPerDay}
              </Text>
              <Text style={styles.subText}>
                {' '}
                {Strings.stepGoalProgress.for}{' '}
              </Text>
              <Text style={styles.mainText}>
                {props?.goal?.days}{' '}
                {props?.goal?.days === 1
                  ? Strings.stepGoalProgress.day
                  : Strings.stepGoalProgress.days}
              </Text>
            </>
          )}
        </View>
        <View style={[styles.goalRow, styles.bottomRow]}>
          <View style={[styles.progressWrapper]}>
            <View style={[styles.progressLeft, styles[progressClass]]}>
              <Image
                style={styles.checkIcon}
                source={
                  progressClass === 'goalMet'
                    ? require('../assets/check_circle_outline_white.png')
                    : require('../assets/check_circle_outline_gray.png')
                }
              />
            </View>
            <View style={[styles.progressRight, styles[progressClass]]}>
              <Text
                style={[
                  styles.progressText,
                  progressClass === 'goalMet' ? styles.progressTextGoalMet : '',
                ]}>
                {upperCase(progressText)}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.changeGoalButton}
              onPress={() =>
                navigation.navigate('SetYourStepGoal', {
                  fromProgress: true,
                })
              }>
              <Text style={styles.changeGoalButtonText}>
                {Strings.stepGoalProgress.changeMyGoal}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          style={styles.goalWatermark}
          source={require('../assets/ribbon_big.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 108,
    backgroundColor: Colors.secondary.lightGray2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 16,
    color: Colors.primary.gray2,
  },
  innerBox: {
    width: '100%',
  },
  myGoal: {
    fontSize: 14,
    marginBottom: 10,
    zIndex: 10,
  },
  goalRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  bottomRow: {
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  progressWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
  },
  progressLeft: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  progressRight: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  checkIcon: {
    marginRight: 2,
    marginTop: 1,
    marginLeft: 2,
  },
  progressText: {
    color: Colors.primary.gray2,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 17,
  },
  progressTextGoalMet: {
    color: 'white',
  },
  inProgress: {
    padding: 2,
  },
  goalMet: {
    backgroundColor: Colors.primary.darkGreen,
    color: 'white',
    padding: 3,
  },
  goalNotMet: {
    color: Colors.primary.gray2,
    backgroundColor: Colors.accent.orange,
    padding: 3,
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 24,
    fontWeight: 'normal',
  },
  icon: {
    position: 'absolute',
    opacity: 0.15,
  },
  goalWatermark: {
    position: 'absolute',
    resizeMode: 'contain',
    height: 107,
    zIndex: 1,
    top: 9,
  },
  changeGoalButton: {
    marginTop: 16,
  },
  changeGoalButtonText: {
    color: Colors.primary.gray2,
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
