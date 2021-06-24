'use strict'

import Fitness from '@ovalmoney/react-native-fitness';
import moment from 'moment';

// note that Write permission is requested because on Android, Intentional Walk may be the
// first app to request Step activity from Google Play Services (i.e. if Google Fit is not
// installed and used)- at least, this is my best understanding at this time
const permissions = [
  { kind: Fitness.PermissionKinds.Steps, access: Fitness.PermissionAccesses.Write },
  { kind: Fitness.PermissionKinds.Distances, access: Fitness.PermissionAccesses.Write },
];

function requestPermissions() {
  return Fitness.requestPermissions(permissions).then((permitted) => {
    if (permitted) {
      if (Platform.OS === 'android') {
        Fitness.subscribeToSteps().then(function(subscribed) {
          /// TODO handle errors
        });
      }
    }
    return permitted;
  });
}

/// on android, the interval dates are not on day boundaries, so normalize
function normalize(records) {
  const normalizedRecords = []
  let day = null;
  for (let record of records) {
    if (day == null || !(moment(record.startDate).isSameOrAfter(day.startDate) && moment(record.endDate).isBefore(day.endDate))) {
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

function getSteps(from, to) {
  return Fitness.isAuthorized(permissions).then((authorized) => {
      if (authorized) {
        return Fitness.getSteps({
          startDate: from.toISOString(),
          endDate: to.toISOString(),
          interval: 'days'
        }).then(steps => {
          return normalize(steps);
        });
      } else {
        throw 'unauthorized';
      }
    });
}

function getDistance(from, to) {
  return Fitness.isAuthorized(permissions).then((authorized) => {
      if (authorized) {
        return Fitness.getDistances({
          startDate: from.toISOString(),
          endDate: to.toISOString(),
          interval: 'days'
        }).then(distances => {
          return normalize(distances);
        });
      } else {
        throw 'unauthorized';
      }
    });
}

function getStepsAndDistances(from, to) {
  return Promise.all([
    getSteps(from, to),
    getDistance(from, to)
  ]).then(([steps, distances]) => {
    /// combine steps and distances into a single payload as expected by API
    const dailyWalks = [];
    for (let [i, step] of steps.entries()) {
      const dailyWalk = {
        date: step.startDate.format('YYYY-MM-DD'),
        steps: step.quantity
      };
      if (i < distances.length && distances[i].startDate.isSame(step.startDate)) {
        dailyWalk.distance = distances[i].quantity;
      } else {
        /// not sure if this will ever happen, but just in case steps/distances array don't match
        for (let distance of distances) {
          if (distance.startDate.isSame(step.startDate)) {
            dailyWalk.distance = distance.quantity;
            break;
          }
        }
      }
      dailyWalks.push(dailyWalk);
    }
    return dailyWalks;
  });
}

export default {
  requestPermissions,
  getDistance,
  getSteps,
  getStepsAndDistances,
};
