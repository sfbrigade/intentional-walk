import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Input,
  MultipleChoiceQuestion,
  MultipleChoiceAnswer,
  PaginationDots,
  Popup,
} from '../../components';
import {GlobalStyles, Colors} from '../../styles';
import {Api, Realm, Strings} from '../../lib';

export default function WhatIsRaceScreen({navigation}) {
  const [raceID, setRaceID] = useState([]);
  const [raceOther, setRaceOther] = useState('');

  const [isLoading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const options = [
    {id: 1, value: 'NA', text: Strings.whatIsYourRace.americanNative},
    {id: 2, value: 'AS', text: Strings.whatIsYourRace.asian},
    {id: 3, value: 'BL', text: Strings.whatIsYourRace.black},
    {id: 4, value: 'PI', text: Strings.whatIsYourRace.pacificIsl},
    {id: 5, value: 'WH', text: Strings.whatIsYourRace.white},
  ];

  function isValid() {
    let filled = true;
    if (raceOther.trim() === '' && raceID.indexOf(98) >= 0) {
      filled = false;
    }
    return !isLoading && raceID.length > 0 && filled;
  }

  async function onNextPress() {
    setLoading(true);

    const values = [];
    options.map(o => {
      if (raceID.indexOf(o.id) >= 0) {
        values.push(o.value);
      }
    });
    if (raceID.indexOf(98) >= 0) {
      values.push('OT');
    }
    if (raceID.indexOf(99) >= 0) {
      values.push('DA');
    }

    try {
      const user = await Realm.getUser();
      await Realm.write(() => {
        user.race = values;
        user.race_other = raceID.indexOf(98) >= 0 ? raceOther.trim() : '';
      });
      await Api.appUser.update(user.id, {
        race: user.race,
        race_other: user.race_other,
      });
      setLoading(false);
      navigation.navigate('WhatIsGenderIdentity');
    } catch {
      setLoading(false);
      setAlertTitle(Strings.common.serverErrorTitle);
      setAlertMessage(Strings.common.serverErrorMessage);
      setShowAlert(true);
    }
  }

  function pressCheck(id) {
    let whatsChecked = [...raceID];
    const declinedID = 99;
    if (id === declinedID) {
      whatsChecked = [declinedID];
    } else {
      if (whatsChecked.indexOf(id) >= 0) {
        whatsChecked.splice(whatsChecked.indexOf(id), 1);
      } else if (whatsChecked.indexOf(id) === -1) {
        whatsChecked.push(id);
      }
      if (whatsChecked.indexOf(declinedID) >= 0) {
        whatsChecked.splice(whatsChecked.indexOf(declinedID), 1);
      }
    }
    setRaceID(whatsChecked);
  }

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView style={GlobalStyles.container}>
        <View style={styles.content}>
          <MultipleChoiceQuestion
            text={Strings.whatIsYourRace.question}
            subText={Strings.whatIsYourRace.questionSub}
            style={styles.content}>
            {options.map(o => (
              <MultipleChoiceAnswer
                key={o.id}
                text={o.text}
                checked={raceID.indexOf(o.id) >= 0}
                onPress={() => pressCheck(o.id)}
                editable={!isLoading}
              />
            ))}
            <MultipleChoiceAnswer
              text={Strings.whatIsYourRace.other}
              // subText={Strings.whatIsYourRace.otherSub}
              checked={raceID.indexOf(98) >= 0}
              onPress={() => pressCheck(98)}
              editable={!isLoading}
            />
            {raceID.indexOf(98) >= 0 && (
              <Input
                placeholder={Strings.whatIsYourRace.otherSub}
                onChangeText={newValue => {
                  setRaceOther(newValue);
                }}
                returnKeyType="next"
                placeholderTextColor="#C3C3C3"
                editable={!isLoading}
              />
            )}
            <MultipleChoiceAnswer
              text={Strings.whatIsYourRace.declineToAnswer}
              checked={raceID.indexOf(99) >= 0}
              onPress={() => pressCheck(99)}
              editable={!isLoading}
            />
          </MultipleChoiceQuestion>
          <View style={styles.content}>
            <Button
              style={styles.button}
              isEnabled={isValid()}
              onPress={onNextPress}>
              {Strings.common.next}
            </Button>
            <PaginationDots currentPage={3} totalPages={8} />
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
