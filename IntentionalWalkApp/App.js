/**
 * Intentional Walk Step Counter Prototype
 * January 21, 2020
 * Alexander Huesing
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

//Found a progress bar to steal
import ProgressBar from 'react-native-progress/Bar';


const  App:() => React$Node = () => {
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

          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Mission Statement</Text>
              <Text style={styles.sectionDescription}>
                From this rock we will build a step counter app 
              </Text>

              {/* TODO: How to increment progress bar? 
              -progress should equal "steps / step goal" or something
              -get feedback on width*/}

              <ProgressBar progress={.9} width={200} />


            </View>
          </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  //make SafeAreaView safer, per recommendation here: https://facebook.github.io/react-native/docs/safeareaview
  container: {
    flex: 1,
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
