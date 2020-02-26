import React, {useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStack, OnboardingStack } from './routes';
import { navigationRef, routeNameRef, onStateChange } from './screens/tracker';

const RootStack = createStackNavigator();

//// initialize first route
routeNameRef.current = 'Home';

const App: () => React$Node = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={state => onStateChange(state)}>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen name="MainStack" component={MainStack} options={{ headerShown: false }} />
        <RootStack.Screen name="OnboardingStack" component={OnboardingStack} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
};

export default App;
