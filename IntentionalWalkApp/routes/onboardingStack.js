import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen, SignUpScreen, InfoScreen} from '../screens/onboarding';
import {Logo} from '../components';
import {GlobalStyles} from '../styles';

const Stack = createStackNavigator();

export default function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{title: null, headerTitle: props => <Logo />, headerTitleContainerStyle: Platform.select({android: GlobalStyles.androidNavHeaderCentered})}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
    </Stack.Navigator>
  );
};
