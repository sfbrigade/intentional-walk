import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStack, OnboardingStack } from './routes';

const RootStack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen name="MainStack" component={MainStack} options={{ headerShown: false }} />
        <RootStack.Screen name="OnboardingStack" component={OnboardingStack} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
};

export default App;
