import React from 'react';
import {Linking} from 'react-native';
import {Button} from './index';

export default function LinkButton({onHeight, style, title, url}) {
  return (
    <Button
      style={style}
      onHeight={onHeight}
      onPress={() => {
        Linking.openURL(url);
      }}>
      {title}
    </Button>
  );
}
