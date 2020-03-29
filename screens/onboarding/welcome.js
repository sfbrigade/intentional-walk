import React, {useState} from 'react';
import {BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Button} from '../../components';
import {Colors, GlobalStyles} from '../../styles';
import {Realm, Strings} from '../../lib';

export default function WelcomeScreen({navigation}) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    })
  );

  const [language, setLanguage] = useState(null);

  const selectLanguage = lang => {
    setLanguage(lang);
    Strings.setLanguage(lang);
    Realm.getSettings().then(settings => Realm.write(() => settings.lang = lang));
  };

  const continuePressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={GlobalStyles.h1}>{Strings.common.welcome}</Text>
          <Text style={styles.subtitle}>{Strings.welcome.select}</Text>
          <Button style={styles.button} isToggle={true} isSelected={language === 'en'} onPress={() => selectLanguage('en')}>English</Button>
          <Button style={styles.button} isToggle={true} isSelected={language === 'es'} onPress={() => selectLanguage('es')}>Español</Button>
          <Button style={styles.button} isToggle={true} isSelected={language === 'zh'} onPress={() => selectLanguage('zh')}>中文</Button>
          {!language ? null : (
            <Button style={[styles.button, {marginTop: 32}]} onPress={continuePressed}>{Strings.welcome.start}</Button>
          )}
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
    color: Colors.primary.purple,
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    width: 180,
  },
  toggleButton: {
    ...GlobalStyles.rounded,
    backgroundColor: 'white',
    borderColor: Colors.primary.purple,
    borderWidth: .5,
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
});
