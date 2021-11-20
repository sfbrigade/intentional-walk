'use strict';

import Pedometer from '@t2tx/react-native-universal-pedometer';
import Realm from './realm';

function startUpdates(callback) {
  Realm.getCurrentWalk().then(walk => {
    if (walk) {
      Pedometer.startPedometerUpdatesFromDate(walk.start.getTime(), callback);
    }
  });
}

function stopUpdates() {
  Pedometer.stopPedometerUpdates();
}

function getPedometerData(end) {
  return new Promise((resolve, reject) => {
    Realm.getCurrentWalk().then(walk => {
      if (walk) {
        Pedometer.queryPedometerDataBetweenDates(
          walk.start.getTime(),
          end.getTime(),
          (error, data) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          },
        );
      }
    });
  });
}

export default {
  startUpdates,
  getPedometerData,
  stopUpdates,
};
