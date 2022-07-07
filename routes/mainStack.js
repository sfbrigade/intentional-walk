import React, {useState} from 'react';
import SideMenu from 'react-native-side-menu-updated';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, View, Text} from 'react-native';
import {
  HomeScreen,
  AboutScreen,
  PartnersScreen,
  ContestRulesScreen,
  PrivacyScreen,
  RecordedWalksScreen,
  WhereToWalkScreen,
} from '../screens/main';
import {
  HamburgerButton,
  HamburgerMenu,
  Logo,
  Popup,
  Button,
} from '../components';
import {Realm, Strings} from '../lib';
import {Colors, GlobalStyles} from '../styles';
import {isActiveRoute, navigationRef} from '../screens/tracker';

const Stack = createStackNavigator();

export default function MainStack() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const logout = () => {
    Realm.destroyUser().then(() => {
      if (!isActiveRoute('Home')) {
        navigationRef.current?.navigate('Home');
      }
      setIsMenuOpen(false);
      navigationRef.current?.navigate('OnboardingStack');
    });
  };

  return (
    <>
      <SideMenu
        isOpen={isMenuOpen}
        onChange={isOpen => setIsMenuOpen(isOpen)}
        menu={
          <HamburgerMenu
            onDone={() => setIsMenuOpen(false)}
            onShowDeleteUser={() => setShowPopup(true)}
            onLogout={logout}
          />
        }>
        <Stack.Navigator
          screenOptions={{
            title: null,
            headerBackImage: () => (
              <Icon
                name="chevron-left"
                size={28}
                color={Colors.primary.purple}
              />
            ),
            headerBackTitle: Strings.common.back.toUpperCase(),
            headerBackTitleVisible: true,
            headerTintColor: Colors.primary.purple,
            headerRight: props => <Logo />,
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerLeft: () => (
                <HamburgerButton onPress={() => setIsMenuOpen(!isMenuOpen)} />
              ),
            }}
          />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Partners" component={PartnersScreen} />
          <Stack.Screen name="ContestRules" component={ContestRulesScreen} />
          <Stack.Screen name="Privacy" component={PrivacyScreen} />
          <Stack.Screen name="RecordedWalks" component={RecordedWalksScreen} />
          <Stack.Screen name="WhereToWalk" component={WhereToWalkScreen} />
        </Stack.Navigator>
      </SideMenu>
      <Popup isVisible={showPopup} onClose={() => setShowPopup(false)}>
        <View style={GlobalStyles.centered}>
          <Text style={GlobalStyles.h1}>{Strings.deleteUser.popupText}</Text>
          <View style={styles.popupButtonsContainer}>
            <Button
              style={[styles.yesDeleteButton, styles.popupButtons]}
              textStyle={styles.yesDeleteText}
              onPress={() => {
                setShowPopup(false);
                logout();
              }}>
              {Strings.deleteUser.yesDelete}
            </Button>
            <Button
              style={styles.popupButtons}
              onPress={() => setShowPopup(false)}>
              {Strings.deleteUser.noGoBack}
            </Button>
          </View>
        </View>
      </Popup>
    </>
  );
}

const styles = StyleSheet.create({
  popupButtonsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  popupButtons: {
    width: '48%',
  },
  yesDeleteButton: {
    ...GlobalStyles.boxShadow,
    backgroundColor: Colors.primary.lightGray,
  },
  yesDeleteText: {
    color: Colors.primary.purple,
  },
});
