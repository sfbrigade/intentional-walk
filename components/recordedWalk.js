import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GlobalStyles, Colors} from '../styles';

export default function RecordedWalk(props) {
  return (
    <View style={styles.container}>
      <Text>Text</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.rounded,
    ...GlobalStyles.boxShadow,
    backgroundColor: 'white',
    height: 80,
  },
});
