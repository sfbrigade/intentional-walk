import React, {useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useFocusEffect} from '@react-navigation/native';

import {ENV_NAME} from '@env';

import {Button, Popup} from '../../components';
import {Colors, GlobalStyles} from '../../styles';
import {Realm, Strings} from '../../lib';
import moment from 'moment';

export default function WelcomeScreen({navigation}) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }),
  );

  const [language, setLanguage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const selectLanguage = lang => {
    setLanguage(lang);
    moment.locale(lang);
    Strings.setLanguage(lang);
    Realm.getSettings().then(settings =>
      Realm.write(() => (settings.lang = lang)),
    );
  };

  const continuePressed = () => {
    setLoading(true);
    Realm.updateContest()
      .then(contest => {
        setLoading(false);
        navigation.navigate('SignUp', {contest: contest.toObject()});
      })
      .catch(error => {
        setLoading(false);
        setShowAlert(true);
      });
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={GlobalStyles.h1}>{Strings.common.welcome}</Text>
          <Text style={styles.subtitle}>{Strings.welcome.select}</Text>
          <Button
            style={styles.button}
            isToggle={true}
            isSelected={language === 'en'}
            onPress={() => selectLanguage('en')}>
            English
          </Button>
          <Button
            style={styles.button}
            isToggle={true}
            isSelected={language === 'es'}
            onPress={() => selectLanguage('es')}>
            Español
          </Button>
          <Button
            style={[styles.button, styles.lastButton]}
            isToggle={true}
            isSelected={language === 'zh-cn'}
            onPress={() => selectLanguage('zh-cn')}>
            中文
          </Button>
          {language && isLoading && (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color={Colors.primary.purple} />
              <Text style={styles.loaderText}>{Strings.common.pleaseWait}</Text>
            </View>
          )}
          {language && !isLoading && (
            <Button style={styles.button} onPress={continuePressed}>
              {Strings.welcome.start}
            </Button>
          )}
          <Text style={styles.aboutText}>
            {ENV_NAME} {DeviceInfo.getSystemName()} v{DeviceInfo.getVersion()}{' '}
            build {DeviceInfo.getBuildNumber()}
          </Text>
        </View>
      </ScrollView>
      <Popup isVisible={showAlert} onClose={() => setShowAlert(false)}>
        <View style={GlobalStyles.centered}>
          <Text style={GlobalStyles.h1}>{Strings.common.serverErrorTitle}</Text>
          <Text style={[GlobalStyles.h2, GlobalStyles.alertText]}>
            {Strings.common.serverErrorMessage}
          </Text>
          <Button style={styles.button} onPress={() => setShowAlert(false)}>
            {Strings.common.okay}
          </Button>
        </View>
      </Popup>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    ...GlobalStyles.content,
    alignItems: 'center',
  },
  subtitle: {
    color: Colors.primary.purple,
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: 40,
  },
  aboutText: {
    fontSize: 12,
    color: Colors.primary.gray2,
    textAlign: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 64,
  },
  alertText: {
    textAlign: 'center',
    marginBottom: 48,
  },
  button: {
    width: 180,
  },
  lastButton: {
    marginBottom: 32,
  },
  toggleButton: {
    ...GlobalStyles.rounded,
    backgroundColor: 'white',
    borderColor: Colors.primary.purple,
    borderWidth: 0.5,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  toggleButtonPressed: {
    backgroundColor: 'purple',
    borderRadius: 7,
    height: 50,
    width: 190,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  startButton: {
    backgroundColor: 'purple',
    borderRadius: 7,
    height: 50,
    width: 190,
    alignItems: 'center',
    justifyContent: 'center',
  },
  none: {
    display: 'none',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Arial',
  },
  loader: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  loaderText: {
    color: Colors.primary.purple,
    fontSize: 24,
    fontWeight: '500',
    marginLeft: 10,
  },
});
