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

  const onNextPress = () => {
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
        <Text style={GlobalStyles.h1}>Things to know.</Text>
        <View style={{flex: 1, alignSelf: 'stretch'}}>
          <Text style={styles.subtitle}>Take a look at this information before you get started.</Text>
            <InfoBox icon="settings"
                     iconSize={64}
                     iconColor={Colors.primary.purple}>
             The iWalk App uses {Platform.select({ios: 'Apple Health', android: 'Google Fit'})} to keep track of your steps. In the next screens, you will be asked to allow iWalk to use this information.
            </InfoBox>
            <InfoBox icon="lock"
                     iconSize={64}
                     iconColor={Colors.secondary.blue}>
              To win a prize through Intentional Walk, you must allow the iWalk App to use {Platform.select({ios: 'Apple Health', android: 'Google Fit'})} information. All information will be kept private and used only for the Intentional Walk program.
            </InfoBox>
            { Platform.OS == 'android' ? (
              <InfoBox icon="account-circle"
                       iconSize={64}
                       iconColor={Colors.primary.darkGreen}>
                Google Fit requires a Google account, if you do not have one, learn how to get one here.
              </InfoBox>
            ) : null }
          </View>
          <Button style={styles.button} onPress={onNextPress}>Next</Button>
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
  },
});
