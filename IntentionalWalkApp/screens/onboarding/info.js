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
import {Button, InfoBox} from '../../components';
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
          <Text style={GlobalStyles.h1}>You’re signed up!</Text>
          <View style={{flex: 1, alignSelf: 'stretch'}}>
            <Text style={styles.subtitle}>From here, participation is easy:</Text>
            <InfoBox title="Walk!"
                     icon="directions-walk"
                     iconSize={80}
                     iconColor={Colors.accent.teal}>
              This app will count your total steps taken each day, just carry your phone with you when you’re walking.
            </InfoBox>
            <InfoBox title="Record!"
                     icon="play-circle-filled"
                     iconSize={80}
                     iconColor={Colors.primary.purple}>
              Use this feature to track your walks. Challenge yourself to increase distance and time!
            </InfoBox>
            <InfoBox title="Win!"
                     icon="star-border"
                     iconSize={80}
                     iconColor={Colors.accent.orange}>
              At the end of the program, the top 10 walkers will be contacted by email to claim their prize. Prizes include SF Giants game tickets, signed team gear, and a special grand prize!
            </InfoBox>
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
  subtitle: {
    textAlign: 'center',
    marginBottom: 48,
    fontSize: 17,
    color: Colors.primary.gray2,
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
