'use strict';

import Realm from 'realm';
import 'react-native-get-random-values';
import _ from 'lodash';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';

import {ENV_NAME} from '@env';

import Api from './api';
import Notifications from './notifications';
import Strings from './strings';

class AppUser {
  get isSurveyCompleted() {
    return (
      this.is_latino &&
      this.race?.length > 0 &&
      this.gender &&
      this.sexual_orien
    );
  }
}

AppUser.schema = {
  name: 'AppUser',
  primaryKey: 'id',
  properties: {
    id: 'string',
    firstName: 'string',
    lastName: 'string',
    name: 'string',
    email: 'string',
    zip: 'string',
    age: 'int',
    createdAt: 'date',
    is_latino: 'string?',
    race: 'string[]',
    race_other: 'string?',
    gender: 'string?',
    gender_other: 'string?',
    sexual_orien: 'string?',
    sexual_orien_other: 'string?',
  },
};

class Contest {
  /// returns TRUE if the current moment is before the contest starts
  get isBeforeStartDate() {
    return this.isBefore(moment());
  }

  /// returns TRUE if the current moment is before the contest baseline period
  get isBeforeBaselineDate() {
    return this.isBeforeBaseline(moment());
  }

  /// returns TRUE if the current moment is after the contest ends
  get isAfterEndDate() {
    return this.isAfter(moment());
  }

  /// returns TRUE if the current moment id during the ONE WEEK AFTER the contest ends
  get isWeekAfterEndDate() {
    const now = moment();
    return (
      this.isAfter(now) &&
      now.isBefore(moment(this.end).endOf('day').add(7, 'days'))
    );
  }

  /// returns TRUE if the current moment is during the contest
  get isDuringContest() {
    return !this.isBeforeStartDate && !this.isAfterEndDate;
  }

  /// returns TRUE if the current moment is during the contest
  get isDuringContestOrBaseline() {
    return !this.isBeforeBaselineDate && !this.isAfterEndDate;
  }

  /// returns TRUE if the date is before the contest starts
  isBefore(date) {
    return this.isBeforeHelper(date, this.start);
  }

  /// returns TRUE if the date is before the contest baseline period
  isBeforeBaseline(date) {
    return this.isBeforeHelper(date, this.startBaseline);
  }

  isBeforeHelper(date, comparison_date) {
    return moment(date).isBefore(moment(comparison_date).startOf('day'));
  }

  /// returns TRUE if the date is after the contest ends
  isAfter(date) {
    return moment(date).isAfter(moment(this.end).endOf('day'));
  }

  /// returns a plain JS object representation to avoid Realm update conflicts
  toObject() {
    return {
      id: this.id,
      start: moment(this.start).toISOString(),
      end: moment(this.end).toISOString(),
      isBeforeStartDate: this.isBeforeStartDate,
      isBeforeBaselineDate: this.isBeforeBaselineDate,
      isDuringContest: this.isDuringContest,
      isDuringContestOrBaseline: this.isDuringContestOrBaseline,
      isAfterEndDate: this.isAfterEndDate,
      isWeekAfterEndDate: this.isWeekAfterEndDate,
    };
  }
}

Contest.schema = {
  name: 'Contest',
  primaryKey: 'id',
  properties: {
    id: 'string',
    startBaseline: 'date',
    startPromo: 'date',
    start: 'date',
    end: 'date',
  },
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
}

IntentionalWalk.schema = {
  name: 'IntentionalWalk',
  primaryKey: 'id',
  properties: {
    id: 'string',
    start: 'date',
    end: 'date?',
    pause: 'int',
    steps: 'int',
    distance: 'double',
    nextNotificationId: 'int?',
  },
};

class Settings {}

Settings.schema = {
  name: 'Settings',
  primaryKey: 'id',
  properties: {
    id: 'int',
    env: 'string',
    accountId: 'string',
    lang: 'string?',
  },
};

function open() {
  return Realm.open({
    schema: [AppUser, Contest, IntentionalWalk, Settings],
    deleteRealmIfMigrationNeeded: true, // TODO: remove after schema stabilizes
  });
}

async function removeAllListeners() {
  const realm = await open();
  realm.removeAllListeners();
}

async function write(callback) {
  const realm = await open();
  realm.write(() => callback(realm));
}

async function getContest() {
  const realm = await open();
  const contests = realm.objects('Contest');
  return contests.length > 0 ? contests[0] : null;
}

async function addContestListener(callback) {
  const realm = await open();
  const contests = realm.objects('Contest');
  contests.addListener((newContests, changes) =>
    callback(newContests.length > 0 ? newContests[0] : null),
  );
}

async function updateContest() {
  const response = await Api.contest.current();
  if (response.data.status === 'success') {
    let contest = null;
    await write(realm => {
      realm.delete(realm.objects('Contest'));
      contest = realm.create('Contest', {
        id: response.data.payload.contest_id,
        startBaseline: moment(
          response.data.payload.start_baseline ??
            response.data.payload.start_promo,
        )
          .startOf('day')
          .toDate(),
        startPromo: moment(response.data.payload.start_promo)
          .startOf('day')
          .toDate(),
        start: moment(response.data.payload.start).startOf('day').toDate(),
        end: moment(response.data.payload.end).endOf('day').toDate(),
      });
    });
    return contest;
  } else {
    throw 'Could not fetch current contest';
  }
}

async function getSettings() {
  const realm = await open();
  let settings = realm.objectForPrimaryKey('Settings', 0);
  if (!settings) {
    realm.write(() => {
      settings = realm.create('Settings', {
        id: 0,
        env: ENV_NAME,
        accountId: uuidv4(),
      });
    });
  }
  return settings;
}

async function createUser(obj) {
  let data = _.pick(obj, [
    'id',
    'firstName',
    'lastName',
    'name',
    'email',
    'zip',
    'age',
    'is_latino',
    'race',
    'race_other',
    'gender',
    'gender_other',
    'sexual_orien',
    'sexual_orien_other',
  ]);
  if (!data.firstName && data.name) {
    data.firstName = data.name.split(' ')[0];
  }
  if (!data.lastName && data.name) {
    data.lastName = data.name.split(' ').pop();
  }
  let user = null;
  await write(realm => {
    user = realm.create(
      'AppUser',
      {
        ...data,
        age: parseInt(data.age, 10),
        createdAt: new Date(),
      },
      'modified',
    );
  });
  return user;
}

async function getUser() {
  const realm = await open();
  const users = realm.objects('AppUser');
  return users.length > 0 ? users[0] : null;
}

async function destroyUser() {
  await write(realm => {
    realm.delete(realm.objects('AppUser'));
    realm.delete(realm.objects('IntentionalWalk'));
    realm.delete(realm.objects('Settings'));
  });
}

async function startWalk() {
  let walk = await getCurrentWalk();
  if (!walk) {
    const permissions = await Notifications.checkPermissions();
    if (!permissions.alert) {
      try {
        const newPermissions = await Notifications.requestPermissions();
        console.log('requestPermissions', newPermissions);
      } catch (error) {
        console.log('requestPermissions error', error);
      }
    }
    await write(realm => {
      walk = realm.create('IntentionalWalk', {
        id: uuidv4(),
        start: new Date(),
        pause: 0,
        steps: 0,
        distance: 0,
        nextNotificationId: Notifications.scheduleNotification(
          Strings.notifications.repeatingRecordingReminder,
          'repeat',
          new Date(Date.now() + 60 * 60 * 1000),
          'hour',
        ),
      });
    });
  }
  return walk;
}

async function getCurrentWalk() {
  const realm = await open();
  const results = realm.objects('IntentionalWalk').filtered('end=null');
  return results.length > 0 ? results[0] : false;
}

async function addCurrentWalkListener(callback) {
  const realm = await open();
  const results = realm.objects('IntentionalWalk').filtered('end=null');
  results.addListener((newResults, changes) =>
    callback(newResults.length > 0 ? newResults[0] : null),
  );
}

async function updateCurrentWalk(data) {
  const walk = await getCurrentWalk();
  await write(realm => {
    if (data) {
      if (data.numberOfSteps && data.numberOfSteps > 0) {
        walk.steps = data.numberOfSteps;
      }
      if (data.distance && data.distance > 0) {
        walk.distance = data.distance;
      }
    }
  });
  return walk;
}

async function stopWalk(end, data) {
  const walk = await getCurrentWalk();
  if (walk) {
    /// cancel any outstanding notifications
    Notifications.cancelNotification(walk.nextNotificationId);
    await write(realm => {
      /// write the final data
      walk.end = end;
      walk.steps = data ? data.numberOfSteps || 0 : 0;
      walk.distance = data ? data.distance || 0 : 0;
    });
    const contest = await getContest();
    if (contest && contest.isDuringContestOrBaseline) {
      const user = await getUser();
      await Api.intentionalWalk.create(
        [
          {
            event_id: walk.id,
            start: walk.start,
            end: walk.end,
            steps: walk.steps,
            distance: walk.distance,
            pause_time: walk.pause,
          },
        ],
        user.id,
      );
    }
  }
}

async function getWalks() {
  const realm = await open();
  return realm.objects('IntentionalWalk').sorted([['end', true]]);
}

async function syncWalks() {
  const user = await getUser();
  if (user) {
    const response = await Api.intentionalWalk.get(user.id);
    if (response && response.data && response.data.intentional_walks) {
      const realm = await open();
      const ids = [];
      /// update walks from server
      await realm.write(() => {
        for (let data of response.data.intentional_walks) {
          ids.push(data.event_id);
          realm.create(
            'IntentionalWalk',
            {
              id: data.event_id,
              start: moment(data.start).toDate(),
              end: moment(data.end).toDate(),
              steps: data.steps,
              distance: data.distance,
              pause: data.pause_time,
            },
            'modified',
          );
        }
      });
      /// during contest, search for any walks that are locally saved but (for some reason) not on server
      const contest = await getContest();
      if (contest) {
        const intentionalWalks = [];
        const results = realm.objects('IntentionalWalk');
        for (let intentionalWalk of results) {
          if (
            !ids.includes(intentionalWalk.id) &&
            !contest.isBeforeBaseline(intentionalWalk.start) &&
            !contest.isAfter(intentionalWalk.end)
          ) {
            intentionalWalks.push({
              event_id: intentionalWalk.id,
              start: intentionalWalk.start,
              end: intentionalWalk.end,
              steps: intentionalWalk.steps,
              distance: intentionalWalk.distance,
              pause_time: intentionalWalk.pause,
            });
          }
        }
        if (intentionalWalks.length > 0) {
          await Api.intentionalWalk.create(intentionalWalks, user.id);
        }
      }
    }
  }
}

export default {
  open,
  write,
  removeAllListeners,
  getContest,
  addContestListener,
  updateContest,
  getSettings,
  createUser,
  getUser,
  destroyUser,
  startWalk,
  getCurrentWalk,
  addCurrentWalkListener,
  updateCurrentWalk,
  stopWalk,
  getWalks,
  syncWalks,
};
