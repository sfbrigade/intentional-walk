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
  const [colors, setColors] = useState([]);
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState(null);
  const [inProgress, setInProgress] = useState(true);
  const [goalMet, setGoalMet] = useState(false);

  const progressClass = inProgress
    ? 'inProgress'
    : goalMet
    ? 'goalMet'
    : 'goalNotMet';

  function getDayOfWeek(dt) {
    const weekday = moment(dt).day();
    // make monday first day of week
    return weekday === 0 ? 6 : weekday - 1;
  }

  const getSteps = useCallback(async function (queryDate, isInProgress) {
    const start = moment(queryDate);
    const end = moment(queryDate).add(1, 'week').subtract(1, 'second');
    const weeklySteps = await Fitness.getSteps(start, end);

    // fill in full week if no steps for dates
    const weekMap = weeklySteps.reduce((acc, curr) => {
      const dayOfWeek = getDayOfWeek(curr.startDate);
      acc[dayOfWeek] = curr.quantity;
      return acc;
    }, {});

    for (let i = 0; i < 7; i++) {
      if (weekMap[i] === undefined) {
        weekMap[i] = 0;
      }
    }

    const stepsPerDay = [];

    for (const day in weekMap) {
      stepsPerDay.push(weekMap[day]);
    }

    setSteps(stepsPerDay);
  }, []);

  const getStepsToGo = useCallback(
    function () {
      if (!goal?.steps) {
        return 'N/A';
      } else if (steps.length === 0) {
        return goal?.steps;
      }
      const dayOfWeek = getDayOfWeek(moment());
      return (goal.steps - steps[dayOfWeek]).toLocaleString();
    },
    [goal, steps],
  );

  const getAvgStepsPerWeek = useCallback(
    function () {
      if (steps.length === 0) {
        return 0;
      }
      const avgSteps = Math.ceil(
        steps.reduce((acc, curr) => acc + curr, 0) / steps.length,
      );
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
        const dayOfWeek = getDayOfWeek(moment());
        return steps[dayOfWeek]?.toLocaleString() ?? 0;
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

      return steps.reduce((acc, curr) => acc + curr, 0).toLocaleString();
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
    getSteps(moment().startOf('isoweek'), true);
    Realm.getWeeklyGoals().then(weeklyGoals => {
      if (weeklyGoals.length) {
        setGoals(weeklyGoals);
        setGoal(weeklyGoals[0]);
        // ensures date is set back to current week, if goal is changed
        setDate(moment().startOf('isoweek'));
      }
    });
    // trigger a refresh when goal is updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route?.params?.refresh]);

  useEffect(() => {
    if (goal === null) {
      return;
    }
    const filteredSteps = steps.filter(day => day >= goal.steps);
    setGoalMet(filteredSteps.length >= Number(goal?.days));
    // set colors for bar chart
    const colorsPerDay = [];
    for (let i = 0; i < steps.length; i++) {
      if (steps[i] >= goal.steps) {
        colorsPerDay.push(() => `${Colors.primary.purple}`);
      } else {
        colorsPerDay.push(() => `${Colors.accent.lightPurple}`);
      }
    }
    setColors(colorsPerDay);
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
                  ? Strings.stepGoalProgress.moreStepsToGo
                  : Strings.stepGoalProgress.totalStepsThisWeek}
              </Text>
            </View>
          </View>
          <View style={styles.chartWrapper}>
            <BarChart
              data={{
                labels: [
                  Strings.stepGoalProgress.mon,
                  Strings.stepGoalProgress.tue,
                  Strings.stepGoalProgress.wed,
                  Strings.stepGoalProgress.thu,
                  Strings.stepGoalProgress.fri,
                  Strings.stepGoalProgress.sat,
                  Strings.stepGoalProgress.sun,
                ],
                datasets: [
                  {
                    data: steps,
                    colors: colors,
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
              withInnerLines={false}
              chartConfig={{
                backgroundColor: Colors.primary.lightGray,
                backgroundGradientFrom: Colors.primary.lightGray,
                backgroundGradientTo: Colors.primary.lightGray,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: () => Colors.primary.purple,
                labelColor: (opacity = 1) => `rgba(79, 79, 79, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              withCustomBarColorFromData={true}
              flatColor={true}
              showBarTops={false}
              showValuesOnTopOfBars={false}
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
