'use strict'

import GoogleFit, { Scopes } from 'react-native-google-fit'
import Realm from './realm';
import moment from 'moment';

function isAuthorized() {
  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ_WRITE,
    ],
  }
  return GoogleFit.authorize(options)
    .then(authResult => {
      if (authResult.success) {
        return;
      } else {
        throw 'unauthorized';
      }
    });
}

function startUpdates(callback) {
  isAuthorized().then(() => {
    GoogleFit.observeSteps(data => getPedometerData(new Date()).then(callback));
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
          GoogleFit.getActivitySamples({
            startDate: moment(walk.start).valueOf(),
            endDate: moment(end).valueOf()
          }, (err, res) => {
            if (err) {
              reject(err);
            } else {
              // [
              //   {
              //     "sourceId": "com.google.android.gms",
              //     "sourceName": "Android",
              //     "tracked": true,
              //     "device": "Android",
              //     "quantity": 18,
              //     "activityName": "unknown",
              //     "distance": 11.297628402709961,
              //     "end": 1584740384997,
              //     "start": 1584740359227
              //   }
              // ]
              const data = {
                numberOfSteps: 0,
                distance: 0
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
            }
          });
        });
      }
    });
  });
}

export default {
  startUpdates,
  getPedometerData,
  stopUpdates
};
