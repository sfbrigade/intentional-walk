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
import {Strings} from '../../lib';

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
        <Text style={GlobalStyles.h1}>{Strings.permissions.thingsToKnow}</Text>
        <View style={{flex: 1, alignSelf: 'stretch'}}>
          <Text style={styles.subtitle}>{Strings.permissions.takeALookText}</Text>
            <InfoBox icon="settings"
                     iconSize={64}
                     iconColor={Colors.primary.purple}>
             {Strings.permissions.settingsText}
            </InfoBox>
            <InfoBox icon="lock"
                     iconSize={64}
                     iconColor={Colors.secondary.blue}>
              {Strings.permissions.prizeText}
            </InfoBox>
            { Platform.OS == 'android' ? (
              <InfoBox icon="account-circle"
                       iconSize={64}
                       iconColor={Colors.primary.darkGreen}>
                {Strings.permissions.googleText}
              </InfoBox>
            ) : null }
          </View>
          <Button style={styles.button} onPress={onNextPress}>{Strings.common.next}</Button>
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
