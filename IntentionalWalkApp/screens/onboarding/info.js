import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Fitness from '@ovalmoney/react-native-fitness';

export default function InfoScreen({navigation}) {

  const startPressed = () => {
    navigation.navigate('MainStack');
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'purple',
          marginTop: 20,
        }}>
        iWalk
      </Text>
      <Text style={{marginTop: 50, fontSize: 26}}>You're Signed Up!</Text>
      <View style={{flex: 1, margin: 20, alignSelf: 'stretch'}}>
        <Text style={{alignSelf: 'flex-start', margin: 10, fontSize: 16}}>
          From here, participation is easy:
        </Text>
        <View style={[styles.box, {backgroundColor: 'turquoise'}]}>
          <Text style={[styles.whiteText, {fontSize: 24}]}>Walk!</Text>
          <Text style={styles.whiteText}>
            This all will count your steps taken each day, just carry your phone
            with you when you're walking.
          </Text>
        </View>
        <View style={[styles.box, {backgroundColor: 'purple'}]}>
          <Text style={[styles.whiteText, {fontSize: 24}]}>Record!</Text>
          <Text style={styles.whiteText}>
            Use the record function to keep track of individual walks that you
            take. Whether you're walking for exercise or just on your way to
            work, it all counts!
          </Text>
        </View>
        <View style={[styles.box, {backgroundColor: 'orange'}]}>
          <Text style={[styles.whiteText, {fontSize: 24}]}>Win!</Text>
          <Text style={styles.whiteText}>
            Top walkers will be notified of their prize winnings over email.
            Prizes include tickets, merchandise and a special Grand Prize!!
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24}} onPress={startPressed}>
          START
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  whiteText: {
    color: 'white',
    fontSize: 16,
  },
  box: {
    borderRadius: 4,
    height: 130,
    margin: 10,
    padding: 10,
  },
  button: {
    position: 'absolute',
    backgroundColor: 'purple',
    borderRadius: 7,
    height: 60,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 100,
    color: 'white',
  },
});
