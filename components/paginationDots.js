import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../styles';

export default function PaginationDots(props) {
  const totalPages = props.totalPages || 1;
  const currentPage = props.currentPage;
  const dots = [];
  for (let i = 0; i < totalPages; i++) {
    dots.push(
      <View
        key={i}
        style={[styles.dot, i + 1 === currentPage ? styles.currentDot : null]}
      />,
    );
  }
  return <View style={[styles.dots, props.style]}>{dots}</View>;
}
const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row',
  },
  dot: {
    backgroundColor: '#DADADA',
    borderRadius: 4,
    width: 8,
    height: 8,
    margin: 2,
  },
  currentDot: {
    backgroundColor: Colors.primary.purple,
  },
});
