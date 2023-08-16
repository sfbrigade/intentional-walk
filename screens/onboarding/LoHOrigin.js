import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  MultipleChoiceQuestion,
  MultipleChoiceAnswer,
  PaginationDots,
  Popup,
} from '../../components';
import {GlobalStyles} from '../../styles';
import {Api, Realm, Strings} from '../../lib';

export default function LoHOriginScreen({navigation, route}) {
  const [lohOrigin, setLohOrigin] = useState(undefined);

  const [isLoading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const options = [
    {id: 1, lohOrigin: 'YE', text: Strings.latinOrHispanicOrigin.yes},
    {id: 2, lohOrigin: 'NO', text: Strings.latinOrHispanicOrigin.no},
    {
      id: 3,
      lohOrigin: 'DA',
      text: Strings.latinOrHispanicOrigin.declineToAnswer,
    },
  ];

  function isValid() {
    return !isLoading && lohOrigin !== undefined;
  }

  async function onNextPress() {
    setLoading(true);
    try {
      // get the user object from Realm
      const user = await Realm.getUser();
      // update the user object with the new survey value
      await Realm.write(() => (user.is_latino = lohOrigin));
      // send the value to the server
      await Api.appUser.update(user.id, {is_latino: user.is_latino});
      setLoading(false);
      navigation.navigate('WhatIsRace');
    } catch {
      setLoading(false);
      setAlertTitle(Strings.common.serverErrorTitle);
      setAlertMessage(Strings.common.serverErrorMessage);
      setShowAlert(true);
    }
  }

  useEffect(() => {
    if (route?.params?.initial) {
      navigation.setOptions({headerLeft: null});
    }
  }, [navigation, route]);

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView style={GlobalStyles.container}>
        <View style={styles.content}>
          <MultipleChoiceQuestion
            text={Strings.latinOrHispanicOrigin.question}
            subText={Strings.latinOrHispanicOrigin.questionSub}
            style={styles.content}>
            {options.map(o => (
              <MultipleChoiceAnswer
                key={o.id}
                text={o.text}
                checked={lohOrigin === o.lohOrigin}
                onPress={() => {
                  setLohOrigin(o.lohOrigin);
                }}
                editable={!isLoading}
              />
            ))}
          </MultipleChoiceQuestion>
          <View style={styles.content}>
            <Button
              style={styles.button}
              isEnabled={isValid()}
              onPress={onNextPress}>
              {Strings.common.next}
            </Button>
            <PaginationDots currentPage={2} totalPages={8} />
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
});
