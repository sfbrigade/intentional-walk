import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {LinkButton, PageTitle} from '../../components';
import {GlobalStyles} from '../../styles';
import {Strings} from '../../lib';

export default function TopWalkersScreen() {
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView>
        <View style={GlobalStyles.content}>
          <PageTitle title={Strings.common.topWalkers} />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 24,
    marginBottom: 24,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  options: {
    textAlign: 'center',
    marginBottom: 16,
  },
});
