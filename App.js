import React, {useRef} from 'react';
import { Platform, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStack, OnboardingStack } from './routes';
import { navigationRef, routeNameRef, onStateChange } from './screens/tracker';

/// load locales, set defaults
import {Strings} from './lib';
import moment from 'moment';
import 'moment/locale/es';
import 'moment/locale/zh-cn';
moment.locale(Strings.getLanguage());

/// https://github.com/facebook/react-native/issues/15114
/// hack for Android phones with non-standard fonts
if (Platform.OS === 'android') {
  const oldRender = Text.render;
  Text.render = function (...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [{fontFamily: 'Roboto'}, origin.props.style]
    });
  };
}

const RootStack = createStackNavigator();

/// initialize first route
routeNameRef.current = 'Home';

const App: () => React$Node = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={state => onStateChange(state)}>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen name="OnboardingStack" component={OnboardingStack} options={{ headerShown: false, gestureEnabled: false }} />
          <RootStack.Screen name="MainStack" component={MainStack} options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
};

export default App;
