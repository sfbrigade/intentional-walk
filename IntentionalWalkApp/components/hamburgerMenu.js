import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, GlobalStyles} from '../styles';
import { isActiveRoute, navigate } from '../screens/tracker';

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
  const onPress = (route) => {
    if (!isActiveRoute(route)) {
      //navigate(route);
    }
    props.onDone();
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerEmail}>placeholder@email.com</Text>
      </View>
      <HamburgerMenuItem onPress={() => onPress('Home')} icon="home" route="Home">Home</HamburgerMenuItem>
      <HamburgerMenuItem onPress={() => onPress('RecordedWalks')} icon="play-arrow" route="RecordedWalks">My Recorded Walks</HamburgerMenuItem>
      <HamburgerMenuItem onPress={() => onPress('Info')} icon="info" route="Info">iWalk Information</HamburgerMenuItem>
      <HamburgerMenuItem onPress={() => onPress('WhereToWalk')} icon="directions-walk" route="WhereToWalk">Where to Walk</HamburgerMenuItem>
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
