import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Autolink from 'react-native-autolink';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import loadLocalResource from 'react-native-local-resource';
import moment from 'moment';

import {
  Button,
  CheckBox,
  Input,
  Logo,
  PaginationDots,
  Popup,
  ScrollText,
} from '../../components';
import {Colors, GlobalStyles} from '../../styles';
import {Api, Realm, Strings} from '../../lib';

import ContestRules from '../../assets/contestRules';
import Privacy from '../../assets/privacy';
import validZipCodes from '../../lib/validZipCodes';

export default function SignUpScreen({navigation, route}) {
  const {contest} = route.params;
  const [focus, setFocus] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [age, setAge] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showContestRules, setShowContestRules] = useState(false);

  const screenDims = Dimensions.get('screen');
  const [privacyText, setPrivacyText] = useState();
  loadLocalResource(Privacy[Strings.getLanguage()]).then(text =>
    setPrivacyText(text),
  );
  const [contestRulesText, setContestRulesText] = useState();
  loadLocalResource(ContestRules[Strings.getLanguage()]).then(text =>
    setContestRulesText(text),
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (showAlert) {
          setShowAlert(false);
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
    }),
  );

  const onSubmit = () => {
    /// validate email
    if (!email.trim().match(/^[^@ ]+@[^. ]+(?:\.[^. ]+)+$/)) {
      setAlertTitle(Strings.signUp.emailAlertTitle);
      setAlertMessage(Strings.signUp.emailAlertMessage);
      setShowAlert(true);
      return;
    }
    /// validate zip-5 digits
    if (!zip.trim().match(/^\d{5}$/)) {
      setAlertTitle(Strings.signUp.zipAlertTitle);
      setAlertMessage(Strings.signUp.zipAlertMessage);
      setShowAlert(true);
      return;
    }
    //validate zip- sf resident
    else if (!validZipCodes.includes(zip.trim())) {
      setAlertTitle(Strings.signUp.zipRestrictionAlertTitle);
      setAlertMessage(Strings.signUp.zipRestrictionAlertMessage);
      setShowAlert(true);
      return;
    }
    /// validate age
    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge < 18) {
      setAlertTitle(Strings.signUp.ageAlertTitle);
      setAlertMessage(Strings.signUp.ageAlertMessage);
      setShowAlert(true);
      return;
    }
    setLoading(true);
    Realm.getSettings()
      .then(settings => {
        return Api.appUser.create(
          name.trim(),
          email.trim(),
          zip.trim(),
          parsedAge,
          settings.accountId,
        );
      })
      .then(response => {
        return Realm.createUser(
          response.data.payload.account_id,
          name.trim(),
          email.trim(),
          zip.trim(),
          parsedAge,
        );
      })
      .then(user => {
        setLoading(false);
        navigation.navigate('Info');
      })
      .catch(error => {
        setLoading(false);
        setAlertTitle(Strings.common.serverErrorTitle);
        setAlertMessage(Strings.common.serverErrorMessage);
        setShowAlert(true);
      });
  };

  const onPolicyPress = () => {
    setShowPrivacyPolicy(true);
  };

  const onContestRulesPress = () => {
    setShowContestRules(true);
  };

  const isValid = () => {
    return (
      name.trim() !== '' &&
      email.trim() !== '' &&
      zip.trim() !== '' &&
      age.trim() !== '' &&
      termsAgreed
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <KeyboardAwareScrollView style={GlobalStyles.container}>
        <View style={styles.content}>
          <Text style={GlobalStyles.h1}>{Strings.common.welcome}</Text>
          <View style={[styles.row, styles.logos]}>
            <Image
              source={require('../../assets/sfdph_logo.png')}
              style={[styles.logo, styles.sfdphLogo]}
            />
            <Image
              source={require('../../assets/sfgiants_logo.png')}
              style={[styles.logo, styles.giantsLogo]}
            />
          </View>
          <Text style={GlobalStyles.p1}>
            {Strings.formatString(
              Strings.signUp.about,
              Strings.formatString(
                Strings.common.range,
                moment(contest.start).format(Strings.common.rangeFrom),
                moment(contest.end).format(Strings.common.rangeTo),
              ),
            )}
          </Text>
          <Input
            onSubmitEditing={() => setFocus('email')}
            onChangeText={newValue => setName(newValue)}
            placeholder={Strings.signUp.name}
            autoCapitalize="words"
            autoCompleteType="name"
            returnKeyType="next"
            editable={!isLoading}
          />
          <Input
            focused={focus === 'email'}
            onSubmitEditing={() => setFocus('zip')}
            onChangeText={newValue => setEmail(newValue)}
            placeholder={Strings.signUp.email}
            autoCompleteType="email"
            keyboardType="email-address"
            returnKeyType="next"
            editable={!isLoading}
          />
          <View style={styles.row}>
            <Input
              focused={focus === 'zip'}
              onSubmitEditing={() => setFocus('age')}
              onChangeText={newValue => setZip(newValue)}
              style={styles.input}
              placeholder={Strings.signUp.zipCode}
              keyboardType="number-pad"
              returnKeyType={Platform.select({ios: 'done', android: 'next'})}
              editable={!isLoading}
            />
            <View style={styles.spacer} />
            <Input
              focused={focus === 'age'}
              onSubmitEditing={() => setFocus('')}
              onChangeText={newValue => setAge(newValue)}
              style={styles.input}
              placeholder={Strings.signUp.age}
              keyboardType="number-pad"
              editable={!isLoading}
            />
          </View>
          <Text style={[GlobalStyles.p1, styles.requiredText]}>
            {Strings.signUp.required}
          </Text>
          <CheckBox
            style={styles.agreeCheckBox}
            checked={termsAgreed}
            onPress={() => setTermsAgreed(!termsAgreed)}
            editable={!isLoading}>
            <Text
              style={[GlobalStyles.p1, styles.agreeText]}
              onPress={() => setTermsAgreed(!termsAgreed)}>
              {Strings.formatString(
                Strings.signUp.agree,
                <Text style={styles.linkText} onPress={onPolicyPress}>
                  {Strings.signUp.policy}
                </Text>,
                <Text style={styles.linkText} onPress={onContestRulesPress}>
                  {Strings.signUp.contestRules}
                </Text>,
              )}
            </Text>
          </CheckBox>
          {isLoading && (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color={Colors.primary.purple} />
              <Text style={styles.loaderText}>{Strings.common.pleaseWait}</Text>
            </View>
          )}
          {!isLoading && (
            <Button
              isEnabled={isValid()}
              style={styles.button}
              onPress={onSubmit}>
              {Strings.signUp.submit}
            </Button>
          )}
          <PaginationDots currentPage={1} totalPages={3} />
        </View>
      </KeyboardAwareScrollView>
      <Popup
        isVisible={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}>
        <View>
          <ScrollText
            style={{height: Math.round((screenDims.height - 100) * 0.8)}}>
            <Logo style={styles.privacyLogo} />
            <Text style={GlobalStyles.h1}>{Strings.common.privacyPolicy}</Text>
            <Autolink text={privacyText} style={styles.privacyText} />
          </ScrollText>
        </View>
      </Popup>
      <Popup
        isVisible={showContestRules}
        onClose={() => setShowContestRules(false)}>
        <View>
          <ScrollText
            style={{height: Math.round((screenDims.height - 100) * 0.8)}}>
            <Logo style={styles.privacyLogo} />
            <Text style={GlobalStyles.h1}>{Strings.common.contestRules}</Text>
            <Autolink text={contestRulesText} style={styles.privacyText} />
          </ScrollText>
        </View>
      </Popup>
      <Popup isVisible={showAlert} onClose={() => setShowAlert(false)}>
        <View style={GlobalStyles.centered}>
          <Text style={GlobalStyles.h1}>{alertTitle}</Text>
          <Text style={[GlobalStyles.h2, styles.alertText]}>
            {alertMessage}
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
    width: 280,
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
    alignSelf: 'flex-start',
    width: '80%',
  },
  agreeText: {
    marginBottom: 0,
    lineHeight: 22,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  privacyLogo: {
    marginBottom: 16,
  },
  privacyText: {
    color: Colors.primary.gray2,
  },
  requiredText: {
    alignSelf: 'flex-start',
  },
  loader: {
    flexDirection: 'row',
    height: 48,
    marginBottom: 16,
    alignItems: 'center',
  },
  loaderText: {
    color: Colors.primary.purple,
    fontSize: 24,
    fontWeight: '500',
    marginLeft: 10,
  },
  alertText: {
    textAlign: 'center',
    marginBottom: 48,
  },
});
