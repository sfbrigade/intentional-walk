import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default function MainScreen({navigation}) {
  useEffect(() => {
    // TODO: check if user logged in
    navigation.navigate('OnboardingStack');
  });

  return (
    <View>
      <Text>Main!</Text>
    </View>
  );
}
