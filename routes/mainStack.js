import React, {useState} from 'react';
import SideMenu from 'react-native-side-menu-updated';
import {TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HomeScreen, AboutScreen, PartnersScreen, ContestRulesScreen, PrivacyScreen, RecordedWalksScreen, WhereToWalkScreen} from '../screens/main';
import {HamburgerButton, HamburgerMenu, Logo} from '../components';
import {Strings} from '../lib';
import {Colors} from '../styles';

const Stack = createStackNavigator();

export default function MainStack() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SideMenu isOpen={isMenuOpen}
              onChange={(isOpen) => setIsMenuOpen(isOpen)}
              menu={<HamburgerMenu onDone={() => setIsMenuOpen(false)} />}>
      <Stack.Navigator screenOptions={{
          title: null,
          headerBackImage: () => <Icon name="chevron-left" size={28} color={Colors.primary.purple} />,
          headerBackTitle: Strings.common.back.toUpperCase(),
          headerBackTitleVisible: true,
          headerTintColor: Colors.primary.purple,
          headerRight: props => <Logo />,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerLeft: () => <HamburgerButton onPress={() => setIsMenuOpen(!isMenuOpen)} />,
        }} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Partners" component={PartnersScreen} />
        <Stack.Screen name="ContestRules" component={ContestRulesScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        <Stack.Screen name="RecordedWalks" component={RecordedWalksScreen} />
        <Stack.Screen name="WhereToWalk" component={WhereToWalkScreen} />
      </Stack.Navigator>
    </SideMenu>
  );
};
