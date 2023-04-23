'use strict';

const axios = require('axios');
const {ConcurrencyManager} = require('axios-concurrency');
const _ = require('lodash');

import {API_BASE_URL} from '@env';

const instance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});
const MAX_CONCURRENT_REQUESTS = 1;
// eslint-disable-next-line no-unused-vars
const manager = ConcurrencyManager(instance, MAX_CONCURRENT_REQUESTS);

export default {
  appUser: {
    create: function (
      firstName,
      lastName,
      email,
      zip,
      age,
      account_id,
      is_latino,
      race,
      race_other,
      gender,
      gender_other,
      sexual_orien,
      sexual_orien_other,
    ) {
      return instance.post('appuser/create', {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        email,
        zip,
        age,
        account_id,
        is_latino,
        race,
        race_other,
        gender,
        gender_other,
        sexual_orien,
        sexual_orien_other,
      });
    },
    update: function (account_id, attributes) {
      const payload = _.pick(attributes, [
        'is_latino',
        'race',
        'race_other',
        'gender',
        'gender_other',
        'sexual_orien',
        'sexual_orien_other',
      ]);
      payload.account_id = account_id;
      return instance.put('appuser/create', payload);
    },
    delete: function (account_id) {
      return instance.delete('appuser/delete', {
        data: {account_id: account_id},
      });
    },
  },
  contest: {
    current: function () {
      return instance.get('contest/current');
    },
  },
  dailyWalk: {
    create: function (daily_walks, account_id) {
      return instance.post('dailywalk/create', {
        daily_walks,
        account_id,
      });
    },
  },
  intentionalWalk: {
    create: function (intentional_walks, account_id) {
      return instance.post('intentionalwalk/create', {
        intentional_walks,
        account_id,
      });
    },
    get: function (account_id) {
      return instance.post('intentionalwalk/get', {account_id});
    },
  },
  leaderboard: {
    get: function (device_id, contest_id) {
      return instance.get('leaderboard/get', {
        params: {device_id, contest_id},
      });
    },
  },
};
