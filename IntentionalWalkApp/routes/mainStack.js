import React, {useState} from 'react';
import SideMenu from 'react-native-side-menu';
import {TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, AboutScreen, RecordedWalksScreen, WhereToWalkScreen} from '../screens/main';
import {HamburgerButton, HamburgerMenu, Logo} from '../components';

const Stack = createStackNavigator();

export default function MainStack() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SideMenu isOpen={isMenuOpen}
              onChange={(isOpen) => setIsMenuOpen(isOpen)}
              menu={<HamburgerMenu onDone={() => setIsMenuOpen(false)} />}>
      <Stack.Navigator screenOptions={{
          title: null,
          headerLeft: () => <HamburgerButton onPress={() => setIsMenuOpen(!isMenuOpen)} />,
          headerRight: props => <Logo />,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="RecordedWalks" component={RecordedWalksScreen} />
        <Stack.Screen name="WhereToWalk" component={WhereToWalkScreen} />
      </Stack.Navigator>
    </SideMenu>
  );
};
