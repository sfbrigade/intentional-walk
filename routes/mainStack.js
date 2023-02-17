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
  TopWalkersScreen,
  WhereToWalkScreen,
} from '../screens/main';
import {
  HamburgerButton,
  HamburgerMenu,
  Logo,
  Popup,
  Button,
} from '../components';
import {Api, Realm, Strings} from '../lib';
import {Colors, GlobalStyles} from '../styles';
import {isActiveRoute, navigationRef} from '../screens/tracker';

const Stack = createStackNavigator();

export default function MainStack() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopupLogout, setShowPopupLogout] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  const logout = () => {
    Realm.destroyUser().then(() => {
      if (!isActiveRoute('Home')) {
        navigationRef.current?.navigate('Home');
      }
      setIsMenuOpen(false);
      navigationRef.current?.navigate('OnboardingStack');
    });
  };

  async function deleteUser() {
    const appUser = await Realm.getUser();
    await Api.appUser.delete(appUser.id);
    await logout();
  }

  return (
    <>
      <SideMenu
        isOpen={isMenuOpen}
        onChange={isOpen => setIsMenuOpen(isOpen)}
        menu={
          <HamburgerMenu
            onDone={() => setIsMenuOpen(false)}
            onShowLogout={() => setShowPopupLogout(true)}
            onShowDeleteUser={() => setShowPopupDelete(true)}
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
          <Stack.Screen name="TopWalkers" component={TopWalkersScreen} />
          <Stack.Screen name="WhereToWalk" component={WhereToWalkScreen} />
        </Stack.Navigator>
      </SideMenu>
      <Popup
        isVisible={showPopupLogout}
        onClose={() => setShowPopupLogout(false)}>
        <View style={GlobalStyles.centered}>
          <Text style={GlobalStyles.h1}>{Strings.logout.popupText}</Text>
          <View style={styles.popupButtonsContainer}>
            <Button
              style={[styles.popupConfirmButton, styles.popupButtons]}
              textStyle={styles.popupConfirmText}
              onPress={() => {
                setShowPopupLogout(false);
                logout();
              }}>
              {Strings.logout.yesDelete}
            </Button>
            <Button
              style={styles.popupButtons}
              onPress={() => setShowPopupLogout(false)}>
              {Strings.logout.noGoBack}
            </Button>
          </View>
        </View>
      </Popup>
      <Popup
        isVisible={showPopupDelete}
        onClose={() => setShowPopupDelete(false)}>
        <View style={GlobalStyles.centered}>
          <Text style={GlobalStyles.h1}>{Strings.deleteUser.popupText}</Text>
          <View style={styles.popupButtonsContainer}>
            <Button
              style={[styles.popupConfirmButton, styles.popupButtons]}
              textStyle={styles.popupConfirmText}
              onPress={() => {
                setShowPopupDelete(false);
                deleteUser();
              }}>
              {Strings.deleteUser.yesDelete}
            </Button>
            <Button
              style={styles.popupButtons}
              onPress={() => setShowPopupDelete(false)}>
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
  popupConfirmButton: {
    ...GlobalStyles.boxShadow,
    backgroundColor: Colors.primary.lightGray,
  },
  popupConfirmText: {
    color: Colors.primary.purple,
  },
});
