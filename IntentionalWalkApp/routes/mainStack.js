import React, {useState} from 'react';
import SideMenu from 'react-native-side-menu';
import {TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {MainScreen} from '../screens/main';
import {HamburgerButton, Logo} from '../components';

const Stack = createStackNavigator();

export default function MainStack() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SideMenu isOpen={isMenuOpen} onChange={(isOpen) => setIsMenuOpen(isOpen)}>
      <Stack.Navigator screenOptions={{title: null, headerRight: props => <Logo />}}>
        <Stack.Screen name="Main"
                      component={MainScreen}
                      options={{
                        headerLeft: () => <HamburgerButton onPress={() => setIsMenuOpen(!isMenuOpen)} />
                      }} />
      </Stack.Navigator>
    </SideMenu>
  );
};
