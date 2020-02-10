import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigation.navigate('OnboardingStack');
  }

  render() {
    return (
      <View>
        <Text>Main!</Text>
      </View>
    );
  }
}
