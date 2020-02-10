import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default function MainScreen({navigation}) {
  useEffect(() => {
    navigation.navigate('OnboardingStack');
  });

  return (
    <View>
      <Text>Main!</Text>
    </View>
  );
}
