'use strict'

import GoogleFit, { Scopes } from 'react-native-google-fit'
import Realm from './realm';
import moment from 'moment';

function isAuthorized() {
  return new Promise((resolve, reject) => {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ_WRITE,
      ],
    }
    GoogleFit.authorize(options)
      .then(authResult => {
        if (authResult.success) {
          resolve();
        } else {
          reject()
        }
      })
      .catch(() => {
        reject();
      });
  });
}

const intervalIds = [];
function startUpdates(callback) {
  intervalIds.push(setInterval(() => {
    getPedometerData(new Date()).then(callback);
  }, 1000));
}

function stopUpdates() {
  let id = intervalIds.shift();
  while (id) {
    clearInterval(id);
    id = intervalIds.shift();
  }
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
                  data.numberOfSteps += sample.quantity;
                  data.distance += sample.distance;
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
