'use strict'

import Realm from 'realm';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';
import Strings from './strings';

class AppUser {

};

AppUser.schema = {
  name: 'AppUser',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    email: 'string',
    zip: 'string',
    age: 'int',
  }
};

class IntentionalWalk {
  get timeOfWalk() {
    const start = moment(this.start);
    const noon = moment(start).startOf('day').add(12, 'h');
    if (start.isBefore(noon)) {
      return Strings.common.morningWalk;
    }
    const evening = moment(noon).add(6, 'h');
    if (start.isBefore(evening)) {
      return Strings.common.afternoonWalk;
    }
    return Strings.common.eveningWalk;
  }

  get elapsedTime() {
    if (this.start && this.end) {
      let dt = moment(this.end).diff(this.start, 'seconds');
      if (this.pause) {
        dt -= this.pause;
      }
      return dt;
    }
    return 0;
  }
};

IntentionalWalk.schema = {
  name: 'IntentionalWalk',
  primaryKey: 'id',
  properties: {
    id: 'string',
    start: 'date',
    end: 'date?',
    pause: 'int?',
    steps: 'int?',
    distance: 'double?',
  }
}

class Settings {

}

Settings.schema = {
  name: 'Settings',
  primaryKey: 'id',
  properties: {
    id: 'string',
    lang: 'string?',
  }
}

function open() {
  return Realm.open({
    schema: [AppUser, IntentionalWalk, Settings],
    deleteRealmIfMigrationNeeded: true // TODO: remove after schema stabilizes
  });
};

function write(callback) {
  return new Promise((resolve, reject) => {
    open().then(realm => {
      realm.write(() => callback());
      resolve();
    }).catch(error => reject(error));
  });
}

function getSettings() {
  return new Promise((resolve, reject) => {
    open().then(realm => {
      const settings = realm.objectForPrimaryKey('Settings', '0');
      if (settings) {
        resolve(settings);
      } else {
        realm.write(() => {
          const settings = realm.create('Settings', {id: '0', lang: null});
          resolve(settings);
        })
      }
    }).catch(error => reject(error));
  });
}

function createUser(name, email, zip, age) {
  return new Promise((resolve, reject) => {
    open().then(realm => {
      try {
        realm.write(() => {
          const user = realm.create('AppUser', {
            id: uuidv4(),
            name, email, zip,
            age: parseInt(age)
          });
          resolve(user);
        });
      } catch (e) {
        reject(e);
      }
    });
  });
}

function getUser() {
  return new Promise((resolve, reject) => {
    open().then(realm => {
      const users = realm.objects('AppUser');
      resolve(users.length > 0 ? users[0] : null);
    }).catch(error => reject(error));
  });
}

function destroyUser() {
  return new Promise((resolve, reject) => {
    open().then(realm => {
      try {
        realm.write(() => {
          realm.delete(realm.objects('AppUser'));
          realm.delete(realm.objects('IntentionalWalk'));
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    }).catch(error => reject(error));
  });
}

function startWalk() {
  return new Promise((resolve, reject) => {
    getCurrentWalk().then(walk => {
      if (!walk) {
        open().then(realm => {
          realm.write(() => {
            const walk = realm.create('IntentionalWalk', {
              id: uuidv4(),
              start: new Date(),
              steps: 0,
              distance: 0
            });
            resolve(walk)
          });
        }).catch(error => {
          reject(error);
        });
      } else {
        resolve(walk);
      }
    });
  });
}

function getCurrentWalk() {
  return new Promise((resolve, reject) => {
    open().then(realm => {
      const results = realm.objects('IntentionalWalk').filtered('end=null');
      resolve(results.length > 0 ? results[0] : false);
    });
  });
}

function updateCurrentWalk(data) {
  return new Promise((resolve, reject) => {
    getCurrentWalk().then(walk => {
      open().then(realm => {
        realm.write(() => {
          if (data) {
            if (data.numberOfSteps && data.numberOfSteps > 0) {
              walk.steps = data.numberOfSteps;
            }
            if (data.distance && data.distance > 0) {
              walk.distance = data.distance * 0.000621371;
            }
          }
          resolve(walk);
        });
      }).catch(error => {
        reject(error);
      });
    });
  });
}

function stopWalk(end, data) {
  return new Promise((resolve, reject) => {
    getCurrentWalk().then(walk => {
      if (walk) {
        open().then(realm => {
          realm.write(() => {
            walk.end = end;
            walk.steps = data ? (data.numberOfSteps || 0) : 0;
            walk.distance = data ? (data.distance || 0) * 0.000621371 : 0;
            resolve(walk);
          });
        }).catch(error => {
          reject(error);
        });
      }
    });
  });
}

export default {
  open,
  write,
  getSettings,
  createUser,
  getUser,
  destroyUser,
  startWalk,
  getCurrentWalk,
  updateCurrentWalk,
  stopWalk
};
