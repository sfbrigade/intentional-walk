import React, {useState} from 'react';
import SideMenu from 'react-native-side-menu';
import {TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/main';
import {HamburgerButton, HamburgerMenu, Logo} from '../components';

const Stack = createStackNavigator();

export default function MainStack({navigation}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SideMenu isOpen={isMenuOpen}
              onChange={(isOpen) => setIsMenuOpen(isOpen)}
              menu={<HamburgerMenu navigation={navigation} onDone={() => setIsMenuOpen(false)} />}>
      <Stack.Navigator screenOptions={{
          title: null,
          headerLeft: () => <HamburgerButton onPress={() => setIsMenuOpen(!isMenuOpen)} />,
          headerRight: props => <Logo />,
        }}>
        <Stack.Screen name="Home"
                      component={HomeScreen} />
      </Stack.Navigator>
    </SideMenu>
  );
};
