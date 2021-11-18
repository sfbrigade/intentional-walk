import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Colors} from '../styles';

export default function ScrollText(props) {
  const [showIndicator, setShowIndicator] = useState(true);

  const onScroll = ({nativeEvent}) => {
    const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
    setShowIndicator(
      contentOffset.y < contentSize.height - layoutMeasurement.height - 20,
    );
  };

  return (
    <View style={props.style}>
      <ScrollView
        style={styles.scrollView}
        onScrollEndDrag={onScroll}
        onMomentumScrollEnd={onScroll}>
        {props.children}
      </ScrollView>
      <View
        style={[
          styles.scrollIndicator,
          showIndicator ? null : styles.scrollIndicatorHidden,
        ]}
        pointerEvents="none">
        <Image
          style={styles.scrollIndicatorBackground}
          source={require('../assets/gradient.png')}
        />
        <Icon size={32} name="expand-more" color={Colors.primary.gray2} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    height: '100%',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  scrollIndicatorHidden: {
    position: 'relative',
    display: 'none',
  },
  scrollIndicatorBackground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
