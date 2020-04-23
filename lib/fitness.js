'use strict'

import Fitness from '@ovalmoney/react-native-fitness';
import moment from 'moment';

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
  return new Promise((resolve, reject) => {
    Fitness.isAuthorized().then((authorized) => {
      if (authorized) {
        Fitness.getSteps({
          startDate: from.toISOString(),
          endDate: to.toISOString(),
          interval: 'days'
        }).then(steps => {
          resolve(normalize(steps));
        }).catch(error => {
          reject({code: 'unexpected', error});
        });
      } else {
        reject({code: 'unauthorized'});
      }
    }).catch(error => {
      reject({code: 'unexpected'});
    });
  });
}

function getDistance(from, to) {
  return new Promise((resolve, reject) => {
    Fitness.isAuthorized().then((authorized) => {
      if (authorized) {
        Fitness.getDistance({
          startDate: from.toISOString(),
          endDate: to.toISOString(),
          interval: 'days'
        }).then(distances => {
          resolve(normalize(distances));
        }).catch(error => {
          reject({code: 'unexpected'});
        });
      } else {
        reject({code: 'unauthorized'});
      }
    }).catch(error => {
      reject({code: 'unexpected', error});
    });
  });
}

export default {
  getDistance,
  getSteps,
};
