import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen, SignUpScreen, InfoScreen } from '../screens/onboarding';

const Stack = createStackNavigator();

export default function OnboardingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
    </Stack.Navigator>
  );
};
