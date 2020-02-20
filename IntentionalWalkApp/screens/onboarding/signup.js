import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Button, CheckBox, Input} from '../../components';
import {Colors, GlobalStyles} from '../../styles';

export default function SignUpScreen({navigation}) {
  const [focus, setFocus] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [age, setAge] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const pressHandler = () => {
    navigation.navigate('Info');
  };

  const isValid = () => {
    return name != '' &&
           email != '' &&
           zip != '' &&
           age != '' &&
           termsAgreed;
  }

  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView style={styles.container}>
          <View style={styles.content}>
            <Text style={GlobalStyles.h1}>Welcome to Intentional Walk!!</Text>
            <View style={styles.row}>
              <Image source={require('../../assets/calfresh_logo.png')} style={styles.image} />
              <Image source={require('../../assets/sfgiants_logo.png')} style={styles.image} />
            </View>
            <Text style={GlobalStyles.p1}>
              Intentional Walk is a FREE community walking program that runs from July 1 - July 31, 2020. The program is open to CalFresh/MediCal-eligible San Francisco residents. Top walkers will be eligible for prizes from the San Francisco Giants including game tickets, signed team gear, and a special grand prize! Sign up below to get started!
            </Text>
            <Input onSubmitEditing={() => setFocus('email')} onChangeText={(newValue) => setName(newValue)} placeholder="Name" autoCapitalize="words" autoCompleteType="name"></Input>
            <Input focused={focus == 'email'} onSubmitEditing={() => setFocus('zip')} onChangeText={(newValue) => setEmail(newValue)} placeholder="Email" autoCompleteType="email" keyboardType="email-address"></Input>
            <View style={styles.row}>
              <Input focused={focus == 'zip'} onSubmitEditing={() => setFocus('age')} onChangeText={(newValue) => setZip(newValue)} style={styles.input} placeholder="Zip Code" keyboardType="number-pad"></Input>
              <View style={styles.spacer} />
              <Input focused={focus == 'age'} onChangeText={(newValue) => setAge(newValue)} style={styles.input} placeholder="Age" keyboardType="number-pad"></Input>
            </View>
            <Text style={[GlobalStyles.p1, {alignSelf: 'flex-start'}]}>* all fields required</Text>
            <CheckBox style={{alignSelf: 'flex-start'}} checked={termsAgreed} onPress={() => setTermsAgreed(!termsAgreed)} title="By signing up, I agree to the Terms of Service" />
            <Button isEnabled={isValid()} style={styles.button} onPress={pressHandler}>Submit</Button>
          </View>
        </KeyboardAwareScrollView>
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
  button: {
    width: 180,
    height: 48,
  },
  input: {
    flex: 1,
  },
  image: {
    resizeMode: 'contain',
    height: 75,
    width: 150,
    margin: 10,
  },
  row: {
    flex: 0,
    flexDirection: 'row',
  },
  spacer: {
    width: 16,
  }
});
