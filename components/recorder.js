import React, {useEffect, useRef, useState} from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Button from './button';
import {Colors, GlobalStyles} from '../styles';
import {Pedometer, Realm, Strings} from '../lib';
import moment from 'moment';
import numeral from 'numeral';

export default function Recorder(props) {
  const {activeWalk} = props;
  const safeAreaInsets = useSafeArea();
  const [data, setData] = useState(null);
  const [now, setNow] = useState(new Date());
  const [pause, setPause] = useState(null);
  const isPausedRef = useRef(false);
  const [end, setEnd] = useState(null);

  useEffect(() => {
    Pedometer.startUpdates(newData => {
      if (!isPausedRef.current) {
        setData(newData);
        Realm.updateCurrentWalk(newData);
      }
    });
    return () => Pedometer.stopUpdates();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 500);
    return () => clearInterval(interval);
  }, []);

  const onPause = () => {
    setPause(new Date());
    isPausedRef.current = true;
  };

  const onResume = () => {
    Realm.open().then(realm => {
      realm.write(() => {
        activeWalk.pause =
          (activeWalk.pause || 0) + moment(now).diff(pause, 'seconds');
        isPausedRef.current = false;
        setPause(null);
        setEnd(null);
      });
    });
  };

  const onStop = () => {
    let newEnd;
    if (pause) {
      newEnd = pause;
    } else {
      newEnd = new Date();
      setPause(newEnd);
      isPausedRef.current = true;
    }
    setEnd(newEnd);
    //// get one final update
    Pedometer.getPedometerData(newEnd).then(newData => {
      setData(newData);
      Realm.updateCurrentWalk(newData);
    });
  };

  const onFinish = () => {
    if (end) {
      Pedometer.stopUpdates();
      Realm.stopWalk(end, data);
    }
  };

  let dt = 0,
    elapsedTime;
  if (activeWalk) {
    let compare = now;
    if (end) {
      compare = end;
    } else if (pause) {
      compare = pause;
    }
    dt = moment(compare).diff(activeWalk.start, 'seconds');
    if (activeWalk.pause) {
      dt -= activeWalk.pause;
    }
  }
  const sec = dt % 60;
  const min = Math.floor(dt / 60);
  elapsedTime = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;

  let headerColor = Colors.primary.lightGreen;
  let headerText = Strings.recorder.recording;
  if (end) {
    headerColor = Colors.secondary.red;
    headerText = Strings.formatString(
      Strings.recorder.save,
      activeWalk.timeOfWalk,
    );
  } else if (pause) {
    headerColor = Colors.accent.yellow;
    headerText = Strings.recorder.paused;
  }
  return (
    <View pointerEvents="box-none" style={[styles.container, props.style]}>
      <View style={[styles.header, {backgroundColor: headerColor}]}>
        <Text style={[GlobalStyles.h2, styles.headerText]}>{headerText}</Text>
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.count}>{elapsedTime}</Text>
          <Text style={styles.label}>{Strings.common.mins}</Text>
        </View>
        <View>
          <Text style={styles.count}>
            {numeral(activeWalk.distance * 0.000621371).format('0.0')}
          </Text>
          <Text style={styles.label}>{Strings.common.miles}</Text>
        </View>
        <View>
          <Text style={styles.count}>{activeWalk.steps}</Text>
          <Text style={styles.label}>{Strings.common.steps}</Text>
        </View>
        <View style={[styles.stopButtonRow, end ? styles.show : styles.hide]}>
          <Button
            onPress={onResume}
            style={styles.resumeButton}
            textStyle={{color: Colors.primary.purple}}>
            {Strings.recorder.resume}
          </Button>
          <Button onPress={onFinish} style={styles.finishButton}>
            {Strings.recorder.finish}
          </Button>
        </View>
      </View>
      {!end && (
        <View
          style={[
            styles.buttonsContainer,
            {paddingBottom: safeAreaInsets.bottom},
          ]}>
          <View style={styles.secondaryButtonContainer} />
          {pause && (
            <View style={styles.primaryButtonContainer}>
              <TouchableOpacity onPress={onResume}>
                <Image
                  style={styles.primaryButton}
                  source={require('../assets/record.png')}
                />
              </TouchableOpacity>
              <Text style={[styles.buttonText, styles.resumeText]}>
                {Strings.recorder.resume}
              </Text>
            </View>
          )}
          {!pause && (
            <View style={styles.primaryButtonContainer}>
              <TouchableOpacity onPress={onStop}>
                <Image
                  style={styles.primaryButton}
                  source={require('../assets/stop.png')}
                />
              </TouchableOpacity>
              <Text style={[styles.buttonText, styles.recordText]}>
                {Strings.recorder.stopAndSave}
              </Text>
            </View>
          )}
          {pause && (
            <View style={styles.secondaryButtonContainer}>
              <TouchableOpacity onPress={onStop} style={styles.primaryButton}>
                <Image
                  style={styles.secondaryButton}
                  source={require('../assets/stop.png')}
                />
              </TouchableOpacity>
              <Text style={[styles.buttonText, styles.recordText]}>
                {Strings.recorder.stop}
              </Text>
            </View>
          )}
          {!pause && (
            <View style={styles.secondaryButtonContainer}>
              <TouchableOpacity onPress={onPause} style={styles.primaryButton}>
                <Image
                  style={styles.secondaryButton}
                  source={require('../assets/pause.png')}
                />
              </TouchableOpacity>
              <Text style={[styles.buttonText, styles.pauseText]}>
                {Strings.recorder.pause}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 16,
  },
  header: {
    ...GlobalStyles.boxShadow,
    backgroundColor: Colors.primary.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    color: 'white',
    marginBottom: 0,
  },
  body: {
    ...GlobalStyles.boxShadow,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white',
    flex: 1,
    marginBottom: 20 + 17 + 8 + 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontWeight: 'bold',
    fontSize: 72,
    lineHeight: 72,
    textAlign: 'center',
    color: Colors.primary.purple,
  },
  label: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.primary.purple,
    marginBottom: 20,
  },
  stopButtonRow: {
    position: 'absolute',
    bottom: 4,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  show: {
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
  resumeButton: {
    flex: 1,
    marginRight: 4,
    backgroundColor: 'white',
    borderColor: Colors.primary.purple,
    borderWidth: 2,
  },
  finishButton: {
    flex: 1,
    marginLeft: 4,
  },
  buttonsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 11,
  },
  primaryButtonContainer: {
    alignItems: 'center',
    width: 120,
  },
  primaryButton: {
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    lineHeight: 17,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 20,
  },
  secondaryButtonContainer: {
    alignItems: 'center',
    width: 80,
  },
  secondaryButton: {
    width: 40,
    height: 40,
  },
  pauseText: {
    color: Colors.accent.yellow,
  },
  recordText: {
    color: Colors.secondary.red,
  },
  resumeText: {
    color: Colors.primary.purple,
  },
});
