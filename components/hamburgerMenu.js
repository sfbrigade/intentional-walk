import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, GlobalStyles} from '../styles';
import {isActiveRoute, navigationRef} from '../screens/tracker';
import {Realm} from '../lib';

function HamburgerMenuItem(props) {
  const color = isActiveRoute(props.route) ? Colors.primary.purple : Colors.primary.gray2
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

  useEffect(() => {
    Realm.getUser().then(user => {
      if (user) {
        setEmail(user.email);
      }
    });
  });

  const onPress = (route) => {
    if (!isActiveRoute(route)) {
      if (route == 'Home' || isActiveRoute('Home')) {
        navigationRef.current?.navigate(route);
      } else {
        navigationRef.current?.dispatch({type: 'REPLACE', payload: {name: route}});
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
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerEmail}>{email}</Text>
      </View>
      <HamburgerMenuItem onPress={() => onPress('Home')} icon="home" route="Home">{Strings.common.home}</HamburgerMenuItem>
      <HamburgerMenuItem onPress={() => onPress('RecordedWalks')} icon="play-arrow" route="RecordedWalks">{Strings.common.myRecordedWalks}</HamburgerMenuItem>
      <HamburgerMenuItem onPress={() => onPress('About')} icon="info" route="About">{Strings.common.about}</HamburgerMenuItem>
      <HamburgerMenuItem onPress={() => onPress('WhereToWalk')} icon="directions-walk" route="WhereToWalk">{Strings.common.whereToWalk}</HamburgerMenuItem>
      <HamburgerMenuItem onPress={() => logout()} icon="exit-to-app">{Strings.common.signOut}</HamburgerMenuItem>
    </View>
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
  }
});
