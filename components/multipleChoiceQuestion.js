import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, GlobalStyles} from '../styles';

export default function MultipleChoiceQuestion(props) {
  return (
    <View style={[styles.wrapper, props.style]}>
      <View style={styles.content}>
        <Text style={styles.text}>{props.text}</Text>
        {props.subText ? (
          <Text style={styles.subText}>{props.subText}</Text>
        ) : (
          <></>
        )}
      </View>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  content: {
    minHeight: 68,
    width: '100%',
    paddingTop: 0,
    paddingBottom: 2,
    paddingLeft: 28,
    paddingRight: 28,
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
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.primary.lightGray,
  },
  subText: {
    fontWeight: '500',
    fontSize: 17,
    color: Colors.primary.lightGray,
  },
});
