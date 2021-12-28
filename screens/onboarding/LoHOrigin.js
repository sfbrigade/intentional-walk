/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, MultipleChoiceQuestion, MultipleChoiceAnswer, PaginationDots } from '../../components';
import { GlobalStyles } from '../../styles';
import { Api, Realm, Strings } from '../../lib';

export default function LoHOriginScreen({ navigation, route }) {
  const user = route.params.user;
  const [checked, setChecked] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState(null);

  const onNextPress = () => {
    user.is_latino = value;
    navigation.navigate('WhatIsRace', {user: user});
  };

  const isValid = () => {
    return !isLoading && checked > 0;
  };

  // TODO: Replace when model is updated
  const options = [
    { id: 1, value: true, text: Strings.latinOrHispanicOrigin.yes },
    { id: 2, value: false, text: Strings.latinOrHispanicOrigin.no },
    { id: 3, value: null, text: Strings.latinOrHispanicOrigin.declineToAnswer },
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
                  setValue(o.value);
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
            <PaginationDots currentPage={2} totalPages={6} />
          </View>
        </View>
      </ScrollView>
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
