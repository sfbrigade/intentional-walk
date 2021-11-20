/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, MultipleChoiceQuestion, MultipleChoiceAnswer, PaginationDots } from '../../components';
import { Colors, GlobalStyles } from '../../styles';
import { Strings } from '../../lib';

export default function LoHOriginScreen({ navigation }) {
  const [getChecked, setChecked] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const onNextPress = () => {
    navigation.navigate('Info');
  };

  const isValid = () => {
    return !isLoading && getChecked > 0;
  };

  // Replace when model is updated
  const options = [
    { id: 1, label: Strings.latinOrHispanicOrigin.yes },
    { id: 2, label: Strings.latinOrHispanicOrigin.no },
    { id: 3, label: Strings.latinOrHispanicOrigin.declineToAnswer }
  ];

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView style={GlobalStyles.container}>
        <View style={styles.content}>
          <MultipleChoiceQuestion
            text={Strings.latinOrHispanicOrigin.question}
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
  selectionCheckBox: {
    height: 62,
    width: '100%',
    marginTop: 0,
    marginBottom: 2,
    paddingLeft: 16,
    borderRadius: GlobalStyles.rounded.borderRadius,
    backgroundColor: 'white',
    shadowColor: GlobalStyles.boxShadow.shadowColor,
    shadowOffset: GlobalStyles.boxShadow.shadowOffset,
    shadowOpacity: GlobalStyles.boxShadow.shadowOpacity,
    shadowRadius: GlobalStyles.boxShadow.shadowRadius,
    elevation: GlobalStyles.boxShadow.elevation,
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 18,
    color: Colors.primary.purple,
    paddingLeft: 16,
  },
});
