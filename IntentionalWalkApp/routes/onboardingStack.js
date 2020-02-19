import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen, SignUpScreen, InfoScreen} from '../screens/onboarding';
import {Logo} from '../components';

const Stack = createStackNavigator();

export default function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{title: null, headerTitle: props => <Logo />, headerTitleContainerStyle: {left: 0, width: '100%'}}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
    </Stack.Navigator>
  );
};
