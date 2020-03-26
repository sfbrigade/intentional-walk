import {Platform} from 'react-native';
import LocalizedStrings from 'react-native-localization';

const TLEntries = new LocalizedStrings({
  "en-US":{
    fromHereText: "From here, participation is easy:",
    googleText: "Google Fit requires a Google account, if you do not have one, learn how to get one here.",
    noWalksYetText: "Start a new walk by pressing the record button at the bottom of the screen.",
    prizeText: `To win a prize through Intentional Walk, you must allow the iWalk App to use ${Platform.select({ios: 'Apple Health', android: 'Google Fit'})} information. All information will be kept private and used only for the Intentional Walk program.`,
    recordText: "Use this feature to track your walks. Challenge yourself to increase distance and time!",
    settingsText: `The iWalk App uses ${Platform.select({ios: 'Apple Health', android: 'Google Fit'})} to keep track of your steps. In the next screens, you will be asked to allow iWalk to use this information.`,
    takeALookText: "Take a look at this information before you get started.",
    walkText: "This app will count your total steps taken each day, just carry your phone with you when you’re walking.",
    winText: "At the end of the program, the top 10 walkers will be contacted by email to claim their prize. Prizes include SF Giants game tickets, signed team gear, and a special grand prize!"
  },
  es:{

  },
  cn: {

  }
});

export default TLEntries;