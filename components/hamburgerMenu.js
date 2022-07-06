import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Popup, Button} from '../components';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, GlobalStyles} from '../styles';
import {isActiveRoute, navigationRef} from '../screens/tracker';
import {Realm, Strings} from '../lib';

function HamburgerMenuItem(props) {
  const color = isActiveRoute(props.route)
    ? Colors.primary.purple
    : Colors.primary.gray2;
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={styles.menuItem}>
      <View style={styles.menuItemIcon}>
        <Icon name={props.icon} size={32} color={color} />
      </View>
      <View style={styles.menuItemTextContainer}>
        <Text style={[styles.menuItemText, {color}]}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HamburgerMenu(props) {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    Realm.getUser().then(user => {
      if (user) {
        setEmail(user.email);
      }
    });
  });

  const onPress = route => {
    if (!isActiveRoute(route)) {
      if (route === 'Home' || isActiveRoute('Home')) {
        navigationRef.current?.navigate(route);
      } else {
        navigationRef.current?.dispatch({
          type: 'REPLACE',
          payload: {name: route},
        });
      }
    }
    props.onDone();
  };

  const logout = () => {
    Realm.destroyUser().then(() => {
      if (!isActiveRoute('Home')) {
        navigationRef.current?.navigate('Home');
      }
      props.onDone();
      navigationRef.current?.navigate('OnboardingStack');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.headerLogo}
            source={require('../assets/logo_full.png')}
          />
          <Text style={styles.headerEmail}>{email}</Text>
        </View>
        <HamburgerMenuItem
          onPress={() => onPress('Home')}
          icon="home"
          route="Home">
          {Strings.common.home}
        </HamburgerMenuItem>
        <HamburgerMenuItem
          onPress={() => onPress('RecordedWalks')}
          icon="play-arrow"
          route="RecordedWalks">
          {Strings.common.myRecordedWalks}
        </HamburgerMenuItem>
        <HamburgerMenuItem
          onPress={() => onPress('About')}
          icon="info"
          route="About">
          {Strings.common.about}
        </HamburgerMenuItem>
        <HamburgerMenuItem
          onPress={() => onPress('WhereToWalk')}
          icon="directions-walk"
          route="WhereToWalk">
          {Strings.common.whereToWalk}
        </HamburgerMenuItem>
        <HamburgerMenuItem
          onPress={() => Linking.openURL('mailto:intentionalwalk@sfdph.org')}
          icon="email">
          {Strings.common.emailUs}
        </HamburgerMenuItem>
        <HamburgerMenuItem
          onPress={() => onPress('ContestRules')}
          icon="description"
          route="ContestRules">
          {Strings.common.contestRules}
        </HamburgerMenuItem>
        <HamburgerMenuItem
          onPress={() => onPress('Privacy')}
          icon="description"
          route="Privacy">
          {Strings.common.privacyPolicy}
        </HamburgerMenuItem>
        <HamburgerMenuItem
          onPress={() => onPress('Partners')}
          icon="brightness-low"
          route="Partners">
          {Strings.common.programPartners}
        </HamburgerMenuItem>
        <HamburgerMenuItem onPress={() => setShowPopup(true)} icon="delete">
          {'Delete Account'}
        </HamburgerMenuItem>
        <View style={styles.spacer} />
        <HamburgerMenuItem onPress={() => logout()} icon="exit-to-app">
          {Strings.common.signOut}
        </HamburgerMenuItem>
        <View style={styles.spacer} />
        <Text style={styles.aboutText}>
          {DeviceInfo.getSystemName()} v{DeviceInfo.getVersion()} build{' '}
          {DeviceInfo.getBuildNumber()}
        </Text>
      </ScrollView>
      <Popup isVisible={showPopup} onClose={() => setShowPopup(false)}>
        <View style={GlobalStyles.centered}>
          <Text style={GlobalStyles.h1}>
            {'Are you sure you want to delete ALL of your saved data?'}
          </Text>
          <View style={styles.popupButtons}>
            <Button
              style={styles.yesDeleteButton}
              textStyle={styles.yesDeleteText}
              onPress={() => setShowPopup(false)}>
              {'Yes, Delete'}
            </Button>
            <Button onPress={() => setShowPopup(false)}>{'No, go back'}</Button>
          </View>
        </View>
      </Popup>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    height: 170,
    backgroundColor: Colors.primary.purple,
    justifyContent: 'flex-end',
  },
  headerLogo: {
    alignSelf: 'flex-end',
    resizeMode: 'contain',
    width: 125,
    height: 75,
    opacity: 0.8,
    marginRight: 20,
  },
  headerEmail: {
    ...GlobalStyles.content,
    color: 'white',
    fontSize: 14,
  },
  menuItem: {
    flexDirection: 'row',
  },
  menuItemIcon: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemTextContainer: {
    height: 64,
    justifyContent: 'center',
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  aboutText: {
    position: 'absolute',
    bottom: 24,
    right: 0,
    fontSize: 12,
    color: Colors.primary.gray2,
    textAlign: 'right',
    paddingRight: 24,
  },
  spacer: {
    height: 60,
  },
  popupButtons: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  yesDeleteButton: {
    ...GlobalStyles.boxShadow,
    backgroundColor: Colors.primary.lightGray,
  },
  yesDeleteText: {
    color: Colors.primary.purple,
  },
});
