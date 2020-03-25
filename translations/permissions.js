import {Platform} from 'react-native';
import LocalizedStrings from 'react-native-localization';

const TLPermissions = new LocalizedStrings({
  "en-US":{
    title: "Things to know.",
    subtitle: "Take a look at this information before you get started.",
    settingsText: `The iWalk App uses ${Platform.select({ios: 'Apple Health', android: 'Google Fit'})} to keep track of your steps. In the next screens, you will be asked to allow iWalk to use this information.`,
    prizeText: `To win a prize through Intentional Walk, you must allow the iWalk App to use ${Platform.select({ios: 'Apple Health', android: 'Google Fit'})} information. All information will be kept private and used only for the Intentional Walk program.`,
    googleText: "Google Fit requires a Google account, if you do not have one, learn how to get one here.",
    next: "Next"
  },
  es:{

  },
  cn: {

  }
});

export default TLPermissions;