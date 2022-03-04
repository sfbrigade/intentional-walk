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

export default function WhatIsSexualOrientationScreen({ navigation, route }) {
  const [sexualOrientation, setSexualIOrientation] = useState(null);
  const [sexualOrientationOther, setSexualOrientationOther] = useState('');

  const [checked, setChecked] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  async function onNextPress() {
    setLoading(true);
    try {

      setLoading(false);
      navigation.navigate('Info');
    } catch {
      setLoading(false);
      setAlertTitle(Strings.common.serverErrorTitle);
      setAlertMessage(Strings.common.serverErrorMessage);
      setShowAlert(true);
    }
  }

  function isValid() {
    let filled = true;
    if (sexualOrientationOther.trim() === '' && checked === 98) {
      filled = false;
    }
    return !isLoading && checked > 0 && filled;
  }

  const options = [
    { id: 1, value: 'BS', text: Strings.whatIsYourSexualOrientation.bisexual },
    { id: 2, value: 'SG', text: Strings.whatIsYourSexualOrientation.sameGenderLoving },
    { id: 3, value: 'QU', text: Strings.whatIsYourSexualOrientation.unsure },
    { id: 4, value: 'HS', text: Strings.whatIsYourSexualOrientation.heterosexual },
  ];

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView style={GlobalStyles.container}>
        <View style={styles.content}>
          <MultipleChoiceQuestion
            text={Strings.whatIsYourSexualOrientation.question}
            subText={Strings.whatIsYourSexualOrientation.questionSub}
            style={styles.content}
          >
            {options.map(o =>
              <MultipleChoiceAnswer
                key={o.id}
                text={o.text}
                checked={checked === o.id}
                onPress={() => {
                  setChecked(o.id);
                  setSexualIOrientation(o.value);
                }}
                editable={!isLoading}
              />
            )}
            <MultipleChoiceAnswer
              text={Strings.whatIsYourSexualOrientation.other}
              // subText={Strings.whatIsYourSexualOrientation.otherSub}
              checked={checked === 98}
              onPress={() => {
                setChecked(98);
                setSexualIOrientation('OT');
              }}
              editable={!isLoading}
            />
            <Input
              placeholder={Strings.whatIsYourSexualOrientation.otherSub}
              onChangeText={newValue => setSexualOrientationOther(newValue)}
              returnKeyType="next"
              style={[
                (checked === 98 ? { display: 'flex' } : { display: 'none' }),
              ]}
              placeholderTextColor="#C3C3C3"
              editable={!isLoading}
            />
            <MultipleChoiceAnswer
              text={Strings.whatIsYourSexualOrientation.declineToAnswer}
              checked={checked === 99}
              onPress={() => {
                setChecked(99);
                setSexualIOrientation(null);
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
  );
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
});
