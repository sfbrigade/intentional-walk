'use strict';

const axios = require('axios');
const _ = require('lodash');

const instance = axios.create({
  baseURL: 'https://iwalk-staging.herokuapp.com/api',
});

export default {
  appUser: {
    create: function (
      name,
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
        name,
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
};
