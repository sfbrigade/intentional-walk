import React, {useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, InfoBox, PaginationDots} from '../../components';
import {Colors, GlobalStyles} from '../../styles';
import {Fitness, Strings} from '../../lib';

export default function InfoScreen({navigation}) {

  const onNextPress = () => {
    Fitness.requestPermissions().then((permitted) => {
      if (permitted) {
        if (Platform.OS === 'android') {
          Fitness.subscribeToActivity().then(function(subscribed) {
            /// TODO handle errors
          });
          Fitness.subscribeToSteps().then(function(subscribed) {
            /// TODO handle errors
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
                <Text onPress={() => Linking.openURL(`https://support.google.com/accounts/answer/27441?hl=${Strings.getLanguage()}`)}>{Strings.formatString(Strings.permissions.googleText, <Text style={styles.linkText}>{Strings.permissions.getOneHere}</Text>)}</Text>
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
    marginBottom: 30,
    fontSize: 17,
    color: Colors.primary.gray2,
  },
  infoBox: {
    marginBottom: 30,
  },
  infoBoxLast: {
    marginBottom: 30,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: Colors.primary.purple,
    fontWeight: 'bold',
  },
  button: {
    width: 180,
  },
});
