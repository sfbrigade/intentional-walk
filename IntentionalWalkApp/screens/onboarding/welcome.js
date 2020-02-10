import React, {useState} from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

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
  const [startText, setStartText] = useState(null);

  const selectLanguage = lang => {
    let str;
    if (lang === 'english') {
      str = 'START';
    }
    if (lang === 'spanish') {
      str = 'COMENZAR';
    }
    if (lang === 'chinese') {
      str = '开始';
    }
    setLanguage(lang);
    setStartText(str);
  };

  const continuePress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 40, bottom: 100}}>Welcome!</Text>
      <Text style={{fontSize: 25, bottom: 100}}>Select a language</Text>
      <TouchableOpacity
        style={[language === 'english' ? styles.buttonPress : styles.button]}
        onPress={() => selectLanguage('english')}>
        <Text style={styles.text}>ENGLISH</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[language === 'spanish' ? styles.buttonPress : styles.button]}
        onPress={() => selectLanguage('spanish')}>
        <Text style={styles.text}>ESPAÑOL</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[language === 'chinese' ? styles.buttonPress : styles.button]}
        onPress={() => selectLanguage('chinese')}>
        <Text style={styles.text}>中文</Text>
      </TouchableOpacity>

      {!language ? null : (
        <TouchableOpacity style={styles.startButton} onPress={continuePress}>
          <Text style={styles.text}>{startText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'limegreen',
    borderRadius: 7,
    height: 50,
    width: 190,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    bottom: 50,
  },
  buttonPress: {
    backgroundColor: 'purple',
    borderRadius: 7,
    height: 50,
    width: 190,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    bottom: 50,
  },
  startButton: {
    position: 'absolute',
    backgroundColor: 'purple',
    borderRadius: 7,
    height: 50,
    width: 190,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 100,
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
