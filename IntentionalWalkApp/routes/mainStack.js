import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainScreen} from '../screens/main';
import {Logo} from '../components';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{title: null, headerRight: props => <Logo />}}>
      <Stack.Screen name="Main" component={MainScreen} />
    </Stack.Navigator>
  );
};
