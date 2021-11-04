/* eslint-disable prettier/prettier */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { CustomCheckBox, Button, MultipleChoiceQuestion, PaginationDots } from '../../components';
import { Colors, GlobalStyles } from '../../styles';
import { Strings } from '../../lib';

export default function LoHOriginScreen({ navigation }) {
  const onNextPress = () => {
    navigation.navigate('Info');
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView>
        <View style={styles.content}>
          <MultipleChoiceQuestion text={'Are you of Latin or \nHispanic origin?'} />

          {/* <CustomCheckBox
            style={{ alignSelf: 'flex-start', width: '80%' }}
            checked={false}
            editable={true}
            onPress={() => { }}
          >
            <Text>Test</Text>
          </CustomCheckBox> */}

          <Button style={styles.button} onPress={onNextPress}>
            {Strings.common.next}
          </Button>
          <PaginationDots currentPage={1} totalPages={3} />
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
