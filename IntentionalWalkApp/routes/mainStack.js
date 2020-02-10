import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from '../screens/main';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} />
    </Stack.Navigator>
  );
};
