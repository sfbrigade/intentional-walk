/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, MultipleChoiceQuestion, MultipleChoiceAnswer, PaginationDots, Popup } from '../../components';
import { GlobalStyles } from '../../styles';
import { Api, Realm, Strings } from '../../lib';

export default function LoHOriginScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [age, setAge] = useState('');
  const [lohOrigin, setLohOrigin] = useState(null);

  const [checked, setChecked] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const isValid = () => {
    return !isLoading && checked > 0;
  };

  const onNextPress = () => {
    setLoading(true);
    Realm.getUser()
      .then(x => {
        setName(x.name);
        setEmail(x.email);
        setZip(x.zip);
        setAge(x.age);
        return Api.appUser.create(
          x.name,
          x.email,
          x.zip,
          x.age,
          x.id,
          lohOrigin,
        );
      })
      .then(response => {
        return Realm.createUser(
          response.data.payload.account_id,
          name,
          email,
          zip,
          age,
          lohOrigin,
        );
      })
      .then(user => {
        setLoading(false);
        navigation.navigate('WhatIsRace');
      })
      .catch(error => {
        setLoading(false);
        setAlertTitle(Strings.common.serverErrorTitle);
        setAlertMessage(Strings.common.serverErrorMessage);
        setShowAlert(true);
      });
  };

  const options = [
    { id: 1, lohOrigin: true, text: Strings.latinOrHispanicOrigin.yes },
    { id: 2, lohOrigin: false, text: Strings.latinOrHispanicOrigin.no },
    { id: 3, lohOrigin: null, text: Strings.latinOrHispanicOrigin.declineToAnswer },
  ];

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView style={GlobalStyles.container}>
        <View style={styles.content}>
          <MultipleChoiceQuestion
            text={Strings.latinOrHispanicOrigin.question}
            subText={Strings.latinOrHispanicOrigin.questionSub}
            style={styles.content}
          >
            {options.map(o =>
              <MultipleChoiceAnswer
                key={o.id}
                text={o.text}
                checked={checked === o.id}
                onPress={() => {
                  setChecked(o.id);
                  setLohOrigin(o.lohOrigin);
                }}
                editable={!isLoading}
              />
            )}
          </MultipleChoiceQuestion>
          <View style={styles.content}>
            <Button
              style={styles.button}
              isEnabled={isValid()}
              onPress={onNextPress}
            >
              {Strings.common.next}
            </Button>
            <PaginationDots currentPage={2} totalPages={7} />
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
  button: {
    width: 180,
  },
});
