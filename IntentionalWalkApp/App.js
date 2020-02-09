/**
 * Intentional Walk Step Counter Prototype
 * January 21, 2020
 * Alexander Huesing
 */

import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
} from 'react-native';

//Found a progress bar to steal
import ProgressBar from 'react-native-progress/Bar';

import Fitness from '@ovalmoney/react-native-fitness';



class App extends React.Component {
  //is this where I would put the const data?
  //will default state of empty string be appropriate here?
  //TODO: onPressButton
  // const [buttonPress, steps] = useState('');

  componentDidMount() {
    Fitness.isAuthorized()
      .then((authorized) => {
        console.log("fitness authorized:", authorized);
        if (!authorized) {
          Fitness.requestPermissions()
            .then((authorized) => {
              console.log("fitness authorized by user:", authorized);
              this.getSteps();
            })
            .catch((error) => {
              console.log("error requesting fitness authorization", error);
            });
        } else {

          this.getSteps();
        }
      })
      .catch((error) => {
        //Do something
        console.log("error querying fitness authorization", error);
      });
  }

  getSteps() {
    if (Platform.OS == 'android') {
      //// ensure app is subscribed to activity events on Android
      Fitness.subscribeToActivity().then(function(subscribed) {
        console.log("subscribed", subscribed);
      });
    }
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    Fitness.getSteps({
      startDate: yesterday.toISOString().slice(0,10),
      endDate: today.toISOString().slice(0,10),
      interval: 'days'
    }).then((steps) => {
      console.log("steps", steps);
    }).catch((error) => {
      console.log("error requesting steps", error);
    });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
        {/* RIP ScrollView*/}

            {/* maybe keep this insane HermesInternal thing in for now but I have no idea what its doing */}
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}

          <View style={styles.progressView}>

            {/* TODO: How to increment progress bar?
            -progress should equal "steps / step goal" or something
            -get feedback on width*/}
            <ProgressBar progress={.9} width={200} />
          </View>

          <View style={styles.sectionContainer}>
            <Button title="Step" style = {styles.stepButton}/>
          </View>


          <View style={styles.sectionContainer}>
            <TextInput placeholder="Enter email" style = {styles.userInputText} />
            <TextInput placeholder="Set Password" style = {styles.userInputText}/>
          </View>


        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  //make SafeAreaView safer, per recommendation here: https://facebook.github.io/react-native/docs/safeareaview
  container: {
    flex: 1,
  },

  stepButton: {
    justifyContent: 'center',
    paddingTop: 100,
  },

  userInputText: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },

  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  progressView: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
    justifyContent: "center",

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  highlight: {
    fontWeight: '700',
  },

});

export default App;
