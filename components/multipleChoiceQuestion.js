/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, GlobalStyles } from '../styles';

export default function MultipleChoiceQuestion(props) {
  return (
    <View style={{width: '100%'}}>
      <View style={styles.content}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    height: 68,
    width: '100%',
    paddingTop: 0,
    paddingBottom: 2,
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 0,
    marginBottom: 2,
    borderRadius: GlobalStyles.rounded.borderRadius,
    justifyContent: 'center',
    backgroundColor: Colors.primary.purple,
    shadowColor: GlobalStyles.boxShadow.shadowColor,
    shadowOffset: GlobalStyles.boxShadow.shadowOffset,
    shadowOpacity: GlobalStyles.boxShadow.shadowOpacity,
    shadowRadius: GlobalStyles.boxShadow.shadowRadius,
    elevation: GlobalStyles.boxShadow.elevation,
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 20,
    color: Colors.primary.lightGray,
  },
});
