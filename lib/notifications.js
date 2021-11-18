import PushNotificationIOS from '@react-native-community/push-notification-ios';
var PushNotification = require('react-native-push-notification');

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: false,
});

function cancelNotification(id) {
  id = `${id}`;
  PushNotification.cancelLocalNotifications({id});
}

function checkPermissions() {
  return new Promise((resolve, reject) => {
    PushNotification.checkPermissions(permissions => {
      resolve(permissions);
    });
  });
}

function requestPermissions() {
  return PushNotification.requestPermissions();
}

let lastId = 0;
function scheduleNotification(message, tag, date, repeatType) {
  lastId += 1;
  const id = `${lastId}`;
  const payload = {id, message, tag, date, userInfo: {id, tag}};
  if (repeatType) {
    payload.repeatType = repeatType;
  }
  PushNotification.localNotificationSchedule(payload);
  return lastId;
}

export default {
  cancelNotification,
  checkPermissions,
  requestPermissions,
  scheduleNotification,
};
