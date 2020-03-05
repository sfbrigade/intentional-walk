'use strict'

import {StyleSheet} from 'react-native';
import Colors from './colors';

export default StyleSheet.create({
  androidNavHeaderCentered: {
    left: 0,
    width: '100%',
  },
  rounded: {
    borderRadius: 10,
  },
  content: {
    margin: 16,
  },
  logoFont: {
    fontFamily: 'ConcertOne-Regular',
    fontWeight: 'normal',
  },
  boxShadow: {
    shadowColor: Colors.primary.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 1
  },
  h1: {
    color: Colors.primary.purple,
    fontSize: 36,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 16,
  },
  h2: {
    color: Colors.primary.gray2,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  p1: {
    color: Colors.primary.gray2,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  p2: {
    color: Colors.primary.gray2,
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 10,
  },
});
