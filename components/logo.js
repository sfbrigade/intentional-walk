import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export default function Logo(props) {
  return (
    <View style={[styles.header, props.style]}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginLeft: 20,
    marginRight: 20,
    width: 66,
    height: 16,
  },
});
