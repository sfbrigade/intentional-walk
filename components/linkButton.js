import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {Colors, GlobalStyles} from '../styles';

export default function LinkButton({title, url}) {
  return (
    <View style={styles.content}>
      <Text style={styles.text} onPress={() => {Linking.openURL(url)} }>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    ...GlobalStyles.content,
    ...GlobalStyles.rounded,
    alignItems: 'center',
    backgroundColor: Colors.primary.purple,
    justifyContent: 'center',
    marginVertical: 8,
    height: 48,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center'
  }
});
