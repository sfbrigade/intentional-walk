'use strict';

import Fitness from '@ovalmoney/react-native-fitness';
import moment from 'moment';
import {Platform, PermissionsAndroid} from 'react-native';

const permissions = [
  {
    kind: Fitness.PermissionKinds.Steps,
    access: Fitness.PermissionAccesses.Read,
  },
  {
    kind: Fitness.PermissionKinds.Distances,
    access: Fitness.PermissionAccesses.Read,
  },
];
// note that Write permission is requested because on Android, Intentional Walk may be the
// first app to request Step activity from Google Play Services (i.e. if Google Fit is not
// installed and used)- at least, this is my best understanding at this time
// on Android, we also request "Activity" permission used for the live pedometer implementation
// in lib/pedometer.android.js
if (Platform.OS === 'android') {
  permissions.push({
    kind: Fitness.PermissionKinds.Steps,
    access: Fitness.PermissionAccesses.Write,
  });
  permissions.push({
    kind: Fitness.PermissionKinds.Distances,
    access: Fitness.PermissionAccesses.Write,
  });
  permissions.push({
    kind: Fitness.PermissionKinds.Activity,
    access: Fitness.PermissionAccesses.Read,
  });
  permissions.push({
    kind: Fitness.PermissionKinds.Activity,
    access: Fitness.PermissionAccesses.Write,
  });
}

async function requestPermissions() {
  // on Android, we now need to separately ask for permission to read from the phone's activity sensors
  // SEPARATELY from asking for permissions to use Google Fit APIs below...
  if (Platform.OS === 'android') {
    const result = await PermissionsAndroid.requestMultiple([
      'android.permission.ACTIVITY_RECOGNITION',
      'com.google.android.gms.permission.ACTIVITY_RECOGNITION',
    ]);
    if (
      result['android.permission.ACTIVITY_RECOGNITION'] !==
        PermissionsAndroid.RESULTS.GRANTED &&
      result['com.google.android.gms.permission.ACTIVITY_RECOGNITION'] !==
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      return false;
    }
  }
  let permitted = await Fitness.requestPermissions(permissions);
  if (permitted && Platform.OS === 'android') {
    permitted = await Fitness.subscribeToSteps();
  }
  return permitted;
}

// on android, the interval dates are not on day boundaries, so normalize
function normalize(records) {
  const normalizedRecords = [];
  let day = null;
  for (let record of records) {
    if (
      day == null ||
      !(
        moment(record.startDate).isSameOrAfter(day.startDate) &&
        moment(record.endDate).isBefore(day.endDate)
      )
    ) {
      let startDate = moment(record.startDate).startOf('day');
      let endDate = moment(startDate).add(1, 'days');
      day = {startDate, endDate, quantity: record.quantity};
      normalizedRecords.push(day);
    } else {
      day.quantity += record.quantity;
    }
  }
  return normalizedRecords;
}

async function getSteps(from, to) {
  const isAuthorized = await Fitness.isAuthorized(permissions);
  if (isAuthorized) {
    const steps = await Fitness.getSteps({
      startDate: from.toISOString(),
      endDate: to.toISOString(),
      interval: 'days',
    });
    return normalize(steps);
  } else {
    return [];
  }
}

async function getDistance(from, to) {
  const isAuthorized = await Fitness.isAuthorized(permissions);
  if (isAuthorized) {
    const distances = await Fitness.getDistances({
      startDate: from.toISOString(),
      endDate: to.toISOString(),
      interval: 'days',
    });
    return normalize(distances);
  } else {
    return [];
  }
}

async function getStepsAndDistances(from, to) {
  const [steps, distances] = await Promise.all([
    getSteps(from, to),
    getDistance(from, to),
  ]);
  // combine steps and distances into a single payload as expected by API
  const dailyWalks = [];
  for (let [i, step] of steps.entries()) {
    const dailyWalk = {
      date: step.startDate.format('YYYY-MM-DD'),
      steps: step.quantity,
    };
    if (i < distances.length && distances[i].startDate.isSame(step.startDate)) {
      dailyWalk.distance = distances[i].quantity;
    } else {
      // not sure if this will ever happen, but just in case steps/distances array don't match
      for (let distance of distances) {
        if (distance.startDate.isSame(step.startDate)) {
          dailyWalk.distance = distance.quantity;
          break;
        }
      }
    }
    // observed missing distance values when steps are small, set to 0 as fallback
    dailyWalk.distance = dailyWalk.distance || 0;
    dailyWalks.push(dailyWalk);
  }
  return dailyWalks;
}

export default {
  requestPermissions,
  getDistance,
  getSteps,
  getStepsAndDistances,
};
