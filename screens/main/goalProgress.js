import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import {useSafeArea} from 'react-native-safe-area-context';
import upperCase from 'lodash/upperCase';
import {BarChart} from 'react-native-chart-kit';
import {GlobalStyles, Colors} from '../../styles';
import {Fitness, Realm, Strings} from '../../lib';
import {GoalBox, WeekNavigator} from '../../components';

export default function GoalProgressScreen({route}) {
  const safeAreaInsets = useSafeArea();

  const dateRef = useRef(moment().startOf('isoweek'));
  const [date, setDate] = useState(dateRef.current);
  const [steps, setSteps] = useState([]);
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState(null);
  const [inProgress, setInProgress] = useState(true);
  const [goalMet, setGoalMet] = useState(false);

  const progressClass = inProgress
    ? 'inProgress'
    : goalMet
    ? 'goalMet'
    : 'goalNotMet';

  const getSteps = useCallback(async function (queryDate, isInProgress) {
    const start = moment(queryDate);
    const end = isInProgress
      ? moment(queryDate).endOf('day')
      : moment(queryDate).add(1, 'week').subtract(1, 'second');

    const weeklySteps = await Fitness.getSteps(start, end);
    setSteps(weeklySteps);
  }, []);

  const getStepsToGo = useCallback(
    function () {
      if (!goal?.steps) {
        return 'N/A';
      } else if (steps.length === 0) {
        return goal?.steps;
      }

      return (goal.steps - steps[0].quantity).toLocaleString();
    },
    [goal, steps],
  );

  const getAvgStepsPerWeek = useCallback(
    function () {
      if (steps.length === 0) {
        return 0;
      }
      const avgSteps =
        steps.reduce((acc, curr) => acc + curr.quantity, 0) / steps.length;
      return avgSteps.toLocaleString();
    },
    [steps],
  );

  const getProgressStepString = useCallback(
    function () {
      if (steps.length === 0) {
        return 0;
      }
      if (inProgress) {
        return steps[0]?.quantity?.toLocaleString() ?? 0;
      } else {
        return getAvgStepsPerWeek();
      }
    },
    [getAvgStepsPerWeek, inProgress, steps],
  );

  const getTotalSteps = useCallback(
    function () {
      if (steps.length === 0) {
        return 0;
      }

      return steps
        .reduce((acc, curr) => acc + curr.quantity, 0)
        .toLocaleString();
    },
    [steps],
  );

  function getGoal(queryDate) {
    const weeklyGoals = goals.filter(val => {
      const startOfWeek = moment(val.start_of_week);
      if (startOfWeek.isSameOrBefore(queryDate)) {
        return true;
      } else {
        return false;
      }
    });
    // allow a user to compare prgoress against their first goal, before it was set
    if (weeklyGoals.length) {
      setGoal(weeklyGoals[0]);
    }
  }

  function setDateAndGetWeeklyStepsAndGoal(newDate) {
    dateRef.current = newDate;
    setDate(newDate);
    getGoal(newDate);

    // set inProgress = true if current week
    if (
      moment(newDate).startOf('isoweek').isSame(moment().startOf('isoweek'))
    ) {
      getSteps(newDate, true);
      setInProgress(true);
      setGoalMet(false);
    } else {
      getSteps(newDate, false);
      setInProgress(false);
    }
  }

  useEffect(() => {
    setInProgress(true);
    setGoalMet(false);
    Realm.getWeeklyGoals().then(weeklyGoals => {
      if (weeklyGoals.length) {
        setGoals(weeklyGoals);
        setGoal(weeklyGoals[0]);
        // ensures date is set back to current week, if goal is changed
        setDate(moment().startOf('isoweek'));
      }
    });
    // trigger a refresh when goal is updated
  }, [route?.params?.refresh]);

  useEffect(() => {
    if (goal === null) {
      return;
    }
    const filteredSteps = steps.filter(day => day.quantity >= goal.steps);
    setGoalMet(filteredSteps.length >= Number(goal?.days));
  }, [goal, steps]);

  return (
    <View style={GlobalStyles.container}>
      <ScrollView>
        <View
          style={[
            GlobalStyles.content,
            {paddingBottom: safeAreaInsets.bottom + 20 + 17 + 10 + 54},
          ]}>
          <WeekNavigator
            style={styles.marginBottom}
            date={date}
            setDate={setDateAndGetWeeklyStepsAndGoal}
          />
          <View style={styles.row}>
            <GoalBox goal={goal} inProgress={inProgress} goalMet={goalMet} />
          </View>
          <View style={styles.overview}>
            <View style={styles.overviewLeft}>
              <Text style={styles.overviewHeader}>
                {progressClass === 'inProgress'
                  ? upperCase(Strings.stepGoalProgress.today)
                  : upperCase(Strings.stepGoalProgress.thisWeek)}
              </Text>
              <Text style={styles.overviewMain}>{getProgressStepString()}</Text>
              <Text style={styles.overViewFooter}>
                {progressClass === 'inProgress'
                  ? Strings.stepGoalProgress.stepsToday
                  : Strings.stepGoalProgress.avgStepsPerDay}
              </Text>
            </View>
            <View style={styles.overviewRight}>
              <Text
                style={[
                  styles.overviewMain,
                  progressClass === 'inProgress' ? styles.overviewGo : '',
                ]}>
                {progressClass === 'inProgress'
                  ? getStepsToGo()
                  : getTotalSteps()}
              </Text>
              <Text style={styles.overViewFooter}>
                {progressClass === 'inProgress'
                  ? 'more steps to go'
                  : 'total steps this week'}
              </Text>
            </View>
          </View>
          <View style={styles.chartWrapper}>
            <BarChart
              data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                  {
                    data: inProgress
                      ? dummyWeekThree
                      : goalMet
                      ? dummyWeekTwo
                      : dummyWeekOne,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 36} // from react-native
              height={264}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              fromZero={true}
              withOuterLines={false}
              withInnerLines={true}
              chartConfig={{
                backgroundColor: Colors.primary.lightGray,
                backgroundGradientFrom: Colors.primary.lightGray,
                backgroundGradientTo: Colors.primary.lightGray,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 100) => `rgba(112, 43, 128, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(79, 79, 79, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                /* propsForDots: {
                  r: '6',
                  strokeWidth: '20',
                  stroke: '#ffa726',
                }, */
              }}
              style={styles.chart}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  overview: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  overviewHeader: {
    fontSize: 15,
  },
  overviewMain: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.primary.gray2,
  },
  overviewGo: {
    color: Colors.accent.teal2,
  },
  overViewFooter: {
    color: Colors.secondary.gray3,
    fontSize: 17,
    fontWeight: 'bold',
  },
  overviewLeft: {},
  overviewRight: {
    paddingTop: 17,
  },
  chartWrapper: {
    marginTop: 24,
  },
  chart: {},
});

const dummyWeekOne = [2500, 2301, 2501, 2487, 2545, 2503, 2300];
const dummyWeekTwo = [2500, 2577, 2501, 2487, 2545, 2503, 2300];
const dummyWeekThree = [2500, 2577, 508, '', '', '', ''];
