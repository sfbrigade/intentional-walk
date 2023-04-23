import React from 'react';
import {
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, InfoBox, PaginationDots} from '../../components';
import {Colors, GlobalStyles} from '../../styles';
import {Fitness, Strings} from '../../lib';

export default function InfoScreen({navigation}) {
  const onNextPress = () => {
    Fitness.requestPermissions().then(permitted => {
      if (permitted) {
        navigation.navigate('MainStack', {
          screen: 'Home',
          params: {refresh: true},
        });
      }
    });
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={GlobalStyles.h1}>
            {Strings.permissions.thingsToKnow}
          </Text>
          <View style={styles.permissions}>
            <Text style={styles.subtitle}>
              {Strings.permissions.takeALookText}
            </Text>
            <InfoBox
              style={styles.infoBox}
              icon="settings"
              iconSize={64}
              iconColor={Colors.primary.lightGreen}
              iconStyle={styles.settingsIcon}>
              {Strings.permissions.settingsText}
            </InfoBox>
            <InfoBox
              style={[
                styles.infoBox,
                Platform.select({ios: styles.infoBoxLast}),
              ]}
              icon="lock"
              iconSize={64}
              iconColor={Colors.secondary.blue}
              iconStyle={styles.prizeIcon}>
              {Strings.permissions.prizeText}
            </InfoBox>
            {Platform.OS === 'android' ? (
              <InfoBox
                style={[styles.infoBox, styles.infoBoxLast]}
                icon="account-circle"
                iconSize={64}
                iconColor={Colors.primary.darkGreen}>
                <Text
                  onPress={() =>
                    Linking.openURL(
                      `https://support.google.com/accounts/answer/27441?hl=${Strings.getLanguage()}`,
                    )
                  }>
                  {Strings.formatString(
                    Strings.permissions.googleText,
                    <Text style={styles.linkText}>
                      {Strings.permissions.getOneHere}
                    </Text>,
                  )}
                </Text>
              </InfoBox>
            ) : null}
          </View>
          {Platform.OS === 'android' ? (
            <Button style={styles.googleButton} onPress={onNextPress}>
              <Image
                style={styles.googleButton}
                source={require('../../assets/btn_google_signin_dark_normal_web.png')}
              />
            </Button>
          ) : (
            <Button style={styles.button} onPress={onNextPress}>
              {Strings.common.next}
            </Button>
          )}
          <PaginationDots currentPage={7} totalPages={7} />
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
  permissions: {
    flex: 1,
    alignSelf: 'stretch',
  },
  settingsIcon: {
    marginTop: 10,
  },
  prizeIcon: {
    marginTop: 20,
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
  googleButton: {
    backgroundColor: Colors.primary.lightGray,
    resizeMode: 'contain',
    height: 62,
  },
  button: {
    width: 180,
  },
});
