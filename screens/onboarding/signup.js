import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, CheckBox, Input, PaginationDots} from '../../components';
import {Colors, GlobalStyles} from '../../styles';
import {Realm, Strings} from '../../lib';

export default function SignUpScreen({navigation}) {
  const [focus, setFocus] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [age, setAge] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const pressHandler = () => {
    // TODO: validate form fields
    // TODO: contact server
    Realm.createUser(name, email, zip, age).then(user => {
      navigation.navigate('Info');
    }).catch(error => {
      console.log(e);
      // TODO: display error message
    });
  };

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
            <Text style={GlobalStyles.h1}>{Strings.common.welcome}</Text>
            <View style={[styles.row, styles.logos]}>
              <Image source={require('../../assets/sfdph_logo.png')} style={[styles.logo, styles.sfdphLogo]} />
              <Image source={require('../../assets/sfgiants_logo.png')} style={[styles.logo, styles.giantsLogo]} />
            </View>
            <Text style={GlobalStyles.p1}>{Strings.signUp.about}</Text>
            <Input onSubmitEditing={() => setFocus('email')} onChangeText={(newValue) => setName(newValue)} placeholder={Strings.signUp.name} autoCapitalize="words" autoCompleteType="name" returnKeyType="next"></Input>
            <Input focused={focus == 'email'} onSubmitEditing={() => setFocus('zip')} onChangeText={(newValue) => setEmail(newValue)} placeholder={Strings.signUp.email} autoCompleteType="email" keyboardType="email-address" returnKeyType="next"></Input>
            <View style={styles.row}>
              <Input focused={focus == 'zip'} onSubmitEditing={() => setFocus('age')} onChangeText={(newValue) => setZip(newValue)} style={styles.input} placeholder={Strings.signUp.zipCode} keyboardType="number-pad" returnKeyType={Platform.select({ios: "done", android: "next"})}></Input>
              <View style={styles.spacer} />
              <Input focused={focus == 'age'} onSubmitEditing={() => setFocus('')} onChangeText={(newValue) => setAge(newValue)} style={styles.input} placeholder={Strings.signUp.age} keyboardType="number-pad"></Input>
            </View>
            <Text style={[GlobalStyles.p1, {alignSelf: 'flex-start'}]}>{Strings.signUp.required}</Text>
            <CheckBox style={{alignSelf: 'flex-start'}} checked={termsAgreed} onPress={() => setTermsAgreed(!termsAgreed)} title={Strings.formatString(Strings.signUp.agree, Strings.signUp.policy)} />
            <Button isEnabled={isValid()} style={styles.button} onPress={pressHandler}>{Strings.signUp.submit}</Button>
            <PaginationDots currentPage={1} totalPages={3} />
          </View>
        </KeyboardAwareScrollView>
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
  }
});
