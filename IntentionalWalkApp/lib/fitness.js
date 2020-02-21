'use strict'

import Fitness from '@ovalmoney/react-native-fitness';
import moment from 'moment';

function getSteps(from, to) {
  return new Promise((resolve, reject) => {
    Fitness.isAuthorized().then((authorized) => {
      if (authorized) {
        Fitness.getSteps({
          startDate: from.toISOString(),
          endDate: to.toISOString(),
          interval: 'days'
        }).then(steps => {
          resolve(steps);
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
        }).then(steps => {
          resolve(steps);
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

function getDailySteps(date) {
  const from = date;
  const to = moment(date).add(1, 'days');
  return getSteps(from, to).then(steps => {
    for (let step of steps) {
      if (moment(step.startDate).isSameOrAfter(from) && moment(step.endDate).isSameOrBefore(to)) {
        return step;
      }
    }
    return {quantity: 0};
  });
}

function getTotalSteps(from, to) {
  return getSteps(from, to).then(steps => {
    const result = {quantity: 0};
    for (let step of steps) {
      if (moment(step.startDate).isSameOrAfter(from) && moment(step.endDate).isSameOrBefore(to)) {
        result.quantity += step.quantity;
      }
    }
    return result;
  });
}

function getDailyDistance(date) {
  const from = date;
  const to = moment(date).add(1, 'days');
  return getDistance(from, to).then(distances => {
    for (let distance of distances) {
      if (moment(distance.startDate).isSameOrAfter(from) && moment(distance.endDate).isSameOrBefore(to)) {
        return distance;
      }
    }
    return {quantity: 0};
  });
}

export default {
  getDailySteps,
  getDailyDistance,
  getTotalSteps,
};
