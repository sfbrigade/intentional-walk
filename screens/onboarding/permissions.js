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
import {Button, InfoBox, PaginationDots} from '../../components';
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
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView>
        <View style={styles.content}>
        <Text style={GlobalStyles.h1}>{Strings.permissions.thingsToKnow}</Text>
        <View style={{flex: 1, alignSelf: 'stretch'}}>
          <Text style={styles.subtitle}>{Strings.permissions.takeALookText}</Text>
            <InfoBox style={styles.infoBox}
                     icon="settings"
                     iconSize={64}
                     iconColor={Colors.primary.lightGreen}
                     iconStyle={{marginTop: 10}}>
             {Strings.permissions.settingsText}
            </InfoBox>
            <InfoBox style={[styles.infoBox, Platform.select({ios: styles.infoBoxLast})]}
                     icon="lock"
                     iconSize={64}
                     iconColor={Colors.secondary.blue}
                     iconStyle={{marginTop: 20}}>
              {Strings.permissions.prizeText}
            </InfoBox>
            { Platform.OS == 'android' ? (
              <InfoBox style={[styles.infoBox, styles.infoBoxLast]}
                       icon="account-circle"
                       iconSize={64}
                       iconColor={Colors.primary.darkGreen}>
                {Strings.permissions.googleText}
              </InfoBox>
            ) : null }
          </View>
          <Button style={styles.button} onPress={onNextPress}>{Strings.common.next}</Button>
          <PaginationDots currentPage={3} totalPages={3} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    ...GlobalStyles.content,
    alignItems: 'center',
  },
  subtitle: {
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: 250,
    marginBottom: 70,
    fontSize: 17,
    color: Colors.primary.gray2,
  },
  infoBox: {
    marginBottom: 60,
  },
  infoBoxLast: {
    marginBottom: 30,
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
