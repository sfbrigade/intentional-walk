import React, {useCallback, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Autolink from 'react-native-autolink';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import loadLocalResource from 'react-native-local-resource'
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Button, CheckBox, Input, Logo, PaginationDots, Popup, ScrollText} from '../../components';
import {Colors, GlobalStyles} from '../../styles';
import {Realm, Strings} from '../../lib';

import Privacy from '../../assets/privacy';

export default function SignUpScreen({navigation}) {
  const [focus, setFocus] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [age, setAge] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [showAgeAlert, setShowAgeAlert] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const screenDims = Dimensions.get('screen');
  const [privacyText, setPrivacyText] = useState();
  loadLocalResource(Privacy[Strings.getLanguage()]).then(text => setPrivacyText(text));

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (showAgeAlert) {
          setShowAgeAlert(false);
          return true;
        } else if (showPrivacyPolicy) {
          setShowPrivacyPolicy(false);
          return true;
        }
        return false;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    })
  );

  const onSubmit = () => {
    // TODO: validate form fields
    // TODO: contact server
    Realm.createUser(name, email, zip, age).then(user => {
      navigation.navigate('Info');
    }).catch(error => {
      console.log(e);
      // TODO: display error message
    });
  };

  const onPolicyPress = () => {
    setShowPrivacyPolicy(true);
  }

  const isValid = () => {
    return name != '' &&
           email != '' &&
           zip != '' &&
           age != '' &&
           termsAgreed;
  }

  return (
    <SafeAreaView style={GlobalStyles.container}>
        <KeyboardAwareScrollView style={GlobalStyles.container}>
          <View style={styles.content}>
            <Text style={GlobalStyles.h1} textBreakStrategy="simple">{Strings.common.welcome}</Text>
            <View style={[styles.row, styles.logos]}>
              <Image source={require('../../assets/sfdph_logo.png')} style={[styles.logo, styles.sfdphLogo]} />
              <Image source={require('../../assets/sfgiants_logo.png')} style={[styles.logo, styles.giantsLogo]} />
            </View>
            <Text style={GlobalStyles.p1} textBreakStrategy="simple">{Strings.signUp.about}</Text>
            <Input onSubmitEditing={() => setFocus('email')} onChangeText={(newValue) => setName(newValue)} placeholder={Strings.signUp.name} autoCapitalize="words" autoCompleteType="name" returnKeyType="next"></Input>
            <Input focused={focus == 'email'} onSubmitEditing={() => setFocus('zip')} onChangeText={(newValue) => setEmail(newValue)} placeholder={Strings.signUp.email} autoCompleteType="email" keyboardType="email-address" returnKeyType="next"></Input>
            <View style={styles.row}>
              <Input focused={focus == 'zip'} onSubmitEditing={() => setFocus('age')} onChangeText={(newValue) => setZip(newValue)} style={styles.input} placeholder={Strings.signUp.zipCode} keyboardType="number-pad" returnKeyType={Platform.select({ios: "done", android: "next"})}></Input>
              <View style={styles.spacer} />
              <Input focused={focus == 'age'} onSubmitEditing={() => setFocus('')} onChangeText={(newValue) => setAge(newValue)} style={styles.input} placeholder={Strings.signUp.age} keyboardType="number-pad"></Input>
            </View>
            <Text style={[GlobalStyles.p1, {alignSelf: 'flex-start'}]} textBreakStrategy="simple">{Strings.signUp.required}</Text>
            <CheckBox style={styles.agreeCheckBox} checked={termsAgreed} onPress={() => setTermsAgreed(!termsAgreed)}>
              <Text style={[GlobalStyles.p1, styles.agreeText]} onPress={() => setTermsAgreed(!termsAgreed)}>{Strings.formatString(Strings.signUp.agree, <Text style={styles.linkText} onPress={onPolicyPress}>{Strings.signUp.policy}</Text>)}</Text>
            </CheckBox>
            <Button isEnabled={isValid()} style={styles.button} onPress={onSubmit}>{Strings.signUp.submit}</Button>
            <PaginationDots currentPage={1} totalPages={3} />
          </View>
        </KeyboardAwareScrollView>
        <Popup isVisible={showPrivacyPolicy} onClose={() => setShowPrivacyPolicy(false)}>
          <View>
            <ScrollText style={{height: Math.round((screenDims.height - 100) * 0.8)}}>
              <Logo style={styles.privacyLogo} />
              <Text style={GlobalStyles.h1}>{Strings.common.privacyPolicy}</Text>
              <Autolink text={privacyText} style={styles.privacyText} />
            </ScrollText>
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
  button: {
    width: 180,
  },
  input: {
    flex: 1,
  },
  row: {
    flex: 0,
    flexDirection: 'row',
  },
  logos: {
    alignSelf: 'center',
    marginBottom: 15,
    width: 280
  },
  logo: {
    resizeMode: 'contain',
    height: 100,
    width: '50%',
  },
  sfdphLogo: {
    width: 100,
    marginLeft: 10,
    marginRight: 20,
  },
  giantsLogo: {
    height: 80,
    alignSelf: 'center',
  },
  spacer: {
    width: 16,
  },
  agreeCheckBox: {
    alignSelf: 'flex-start'
  },
  agreeText: {
    marginBottom: 0,
    lineHeight: 32,
  },
  linkText: {
    textDecorationLine: 'underline'
  },
  privacyLogo: {
    marginBottom: 16,
  },
  privacyText: {
    color: Colors.primary.gray2
  },
});
