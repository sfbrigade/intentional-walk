import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {Button} from '../../components';
import {Colors, GlobalStyles} from '../../styles';
import Fitness from '@ovalmoney/react-native-fitness';

export default function InfoScreen({navigation}) {

  const startPressed = () => {
    Fitness.requestPermissions().then((permitted) => {
      if (permitted) {
        if (Platform.OS === 'android') {
          Fitness.subscribeToActivity().then(function(subscribed) {
            console.log('subscribeToActivity', subscribed);
          });
          Fitness.subscribeToSteps().then(function(subscribed) {
            console.log('subscribeToSteps', subscribed);
          });
        }
        navigation.navigate('MainStack');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={GlobalStyles.h1}>You're signed up!</Text>
          <View style={{flex: 1, alignSelf: 'stretch'}}>
            <Text style={{textAlign: 'center', marginBottom: 16, fontSize: 17, color: Colors.primary.gray2}}>
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
          <Button style={styles.button} onPress={startPressed}>Next</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    ...GlobalStyles.content,
    alignItems: 'center',
  },
  whiteText: {
    color: 'white',
    fontSize: 16,
  },
  box: {
    ...GlobalStyles.rounded,
    height: 140,
    padding: 16,
    marginBottom: 16,
  },
  button: {
    width: 180,
    height: 48,
  },
});
