'use strict'

const Realm = require('realm');

class AppUser {

};

AppUser.schema = {
  name: 'AppUser',
  properties: {
    name: 'string',
    email: 'string',
    zip: 'string',
    age: 'int',
  }
};

const open = function() {
  return Realm.open({
    schema: [AppUser],
    deleteRealmIfMigrationNeeded: true // TODO: remove after schema stabilizes
  });
};

export default {
  open
};
