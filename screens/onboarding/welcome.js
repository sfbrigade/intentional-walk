import React, {useState} from 'react';
import {BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Button} from '../../components';
import {Colors, GlobalStyles} from '../../styles';

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
    if (lang === 'en') {
      str = 'Start';
    }
    if (lang === 'es') {
      str = 'Comenzar';
    }
    if (lang === 'zh') {
      str = '开始';
    }
    setLanguage(lang);
    setStartText(str);
  };

  const continuePressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={GlobalStyles.h1}>Welcome to Intentional Walk!!</Text>
          <Text style={styles.subtitle}>Please Select a language</Text>
          <Button style={styles.button} isToggle={true} isSelected={language === 'en'} onPress={() => selectLanguage('en')}>English</Button>
          <Button style={styles.button} isToggle={true} isSelected={language === 'es'} onPress={() => selectLanguage('es')}>Español</Button>
          <Button style={styles.button} isToggle={true} isSelected={language === 'zh'} onPress={() => selectLanguage('zh')}>中文</Button>
          {!language ? null : (
            <Button style={[styles.button, {marginTop: 32}]} onPress={continuePressed}>{startText}</Button>
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
