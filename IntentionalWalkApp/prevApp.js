/**
 * Intentional Walk Step Counter Prototype
 * January 21, 2020
 * Alexander Huesing
 */

import React, { useState } from 'react';
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


const  App:() => React$Node = () => {
  //is this where I would put the const data?
  //will default state of empty string be appropriate here?
  //TODO: onPressButton
  const [buttonPress, steps] = useState('');


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
