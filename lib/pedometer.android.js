'use strict';

import GoogleFit, {Scopes} from 'react-native-google-fit';
import Realm from './realm';
import moment from 'moment';

function isAuthorized() {
  const options = {
    scopes: [Scopes.FITNESS_ACTIVITY_READ, Scopes.FITNESS_ACTIVITY_WRITE],
  };
  return GoogleFit.authorize(options).then(authResult => {
    if (authResult.success) {
      return;
    } else {
      throw 'unauthorized';
    }
  });
}

function startUpdates(callback) {
  isAuthorized().then(() => {
    GoogleFit.observeSteps((isError, data) =>
      getPedometerData(new Date()).then(callback),
    );
  });
}

function stopUpdates() {
  GoogleFit.unsubscribeListeners();
}

function getPedometerData(end) {
  return new Promise((resolve, reject) => {
    Realm.getCurrentWalk().then(walk => {
      if (walk) {
        isAuthorized().then(() => {
          const options = {
            startDate: moment(walk.start).toISOString(),
            endDate: moment(end).toISOString(),
            bucketUnit: 'MINUTE',
            bucketInterval: 1,
          };
          if (end.getTime() - walk.start.getTime() < 60000) {
            options.bucketUnit = 'SECOND';
          }
          GoogleFit.getActivitySamples(options).then(res => {
            //   // [
            //   //   {
            //   //     "sourceId": "com.google.android.gms",
            //   //     "sourceName": "Android",
            //   //     "tracked": true,
            //   //     "device": "Android",
            //   //     "quantity": 18,
            //   //     "activityName": "unknown",
            //   //     "distance": 11.297628402709961,
            //   //     "end": 1584740384997,
            //   //     "start": 1584740359227
            //   //   }
            //   // ]
            const data = {
              numberOfSteps: 0,
              distance: 0,
            };
            for (let sample of res) {
              if (sample.quantity) {
                data.numberOfSteps += sample.quantity;
              }
              if (sample.distance) {
                data.distance += sample.distance;
              }
            }
            resolve(data);
          });
        });
      }
    });
  });
}

export default {
  startUpdates,
  getPedometerData,
  stopUpdates,
};
