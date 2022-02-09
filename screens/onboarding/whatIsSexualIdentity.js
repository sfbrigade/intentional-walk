/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Input, MultipleChoiceQuestion, MultipleChoiceAnswer, PaginationDots, Popup } from '../../components';
import { GlobalStyles, Colors } from '../../styles';
import { Api, Realm, Strings } from '../../lib';

export default function WhatIsSexualdentityScreen({ navigation, route }) {
  const [sexualIdentity, setSexualIdentity] = useState(null);
  const [sexualIdentityOther, setSexualIdentityOther] = useState('');

  const [checked, setChecked] = useState(0);
  const [isOtherInvalid, setOtherInvalid] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const onNextPress = () => {
    setLoading(true);

    if (sexualIdentityOther.trim() === '' && checked === 98) {
      setOtherInvalid(true);
      setSexualIdentityOther('');
      setLoading(false);
      return;
    }
    navigation.navigate('Info');
  };

  const isValid = () => {
    // let filled = true;
    // if (sexualIdentityOther.trim() === '' && checked === 98) {
    //   filled = false;
    // }
    return !isLoading && checked > 0;
  };

  // TODO: Update Values and Text w/ translation when available
  const options = [
    { id: 1, value: '00', text: 'Bisexual' },
    { id: 2, value: '01', text: 'Gay/Lesbian/Same-\nGender Loving' },
    { id: 3, value: '02', text: 'Question/Unsure' },
    { id: 4, value: '03', text: 'Straight/Heterosexual' },
  ];

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView style={GlobalStyles.container}>
        <View style={styles.content}>
          <MultipleChoiceQuestion
            // TODO: Update Text w/ translation when available
            text={'How do you describe your sexual orientation or sexual identy?'}
            // subText={}
            style={styles.content}
          >
            {options.map(o =>
              <MultipleChoiceAnswer
                key={o.id}
                text={o.text}
                checked={checked === o.id}
                onPress={() => {
                  setChecked(o.id);
                  setSexualIdentity(o.value);
                }}
                editable={!isLoading}
              />
            )}
            <MultipleChoiceAnswer
              text={Strings.whatIsYourSexualIdentity.other}
              subText={Strings.whatIsYourSexualIdentity.otherSub}
              checked={checked === 98}
              onPress={() => {
                setChecked(98);
                setSexualIdentity('OT');
              }}
              editable={!isLoading}
            />
            <Input
              // TODO: Replace placeholder string when translations are available
              placeholder={isOtherInvalid ? 'This field cannot be empty' : Strings.whatIsYourSexualIdentity.otherSub}
              onChangeText={newValue => setSexualIdentityOther(newValue)}
              returnKeyType="next"
              style={[
                (checked === 98 ? { display: 'flex' } : { display: 'none' }),
                (isOtherInvalid ? styles.invalidInput : styles.input),
              ]}
              placeholderTextColor={isOtherInvalid ? Colors.secondary.red : '#C3C3C3'}
              editable={!isLoading}
            />
            <MultipleChoiceAnswer
              text={Strings.whatIsYourSexualIdentity.declineToAnswer}
              checked={checked === 99}
              onPress={() => {
                setChecked(99);
                setSexualIdentity(null);
              }}
              editable={!isLoading}
            />
          </MultipleChoiceQuestion>
          <View style={styles.content}>
            <Button
              style={styles.button}
              isEnabled={isValid()}
              onPress={onNextPress}
            >
              {Strings.common.next}
            </Button>
            <PaginationDots currentPage={5} totalPages={7} />
          </View>
        </View>
      </ScrollView>
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
  )
}

const styles = StyleSheet.create({
  content: {
    ...GlobalStyles.content,
    alignItems: 'center',
  },
  alertText: {
    textAlign: 'center',
    marginBottom: 48,
  },
  button: {
    width: 180,
  },
  input: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Colors.primary.purple,
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
  },
  invalidInput: {
    borderRadius: 4,
    borderWidth: 2.5,
    borderColor: Colors.secondary.red,
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
  },
});