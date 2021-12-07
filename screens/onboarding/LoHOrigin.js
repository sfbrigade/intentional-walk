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
import { Strings } from '../../lib';

export default function LoHOriginScreen({ navigation }) {
  const [getChecked, setChecked] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const onNextPress = () => {
    navigation.navigate('WhatIsRace');
  };

  const isValid = () => {
    return !isLoading && getChecked > 0;
  };

  // Replace when model is updated
  const options = [
    { id: 1, label: Strings.latinOrHispanicOrigin.yes },
    { id: 2, label: Strings.latinOrHispanicOrigin.no },
    { id: 3, label: Strings.latinOrHispanicOrigin.declineToAnswer },
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
                text={o.label}
                checked={getChecked === o.id}
                onPress={() => setChecked(o.id)}
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
            <PaginationDots currentPage={1} totalPages={3} />
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
