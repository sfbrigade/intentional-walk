import React, {useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStack, OnboardingStack } from './routes';
import { navigationRef, routeNameRef, getActiveRouteName } from './screens/tracker';

const RootStack = createStackNavigator();
routeNameRef.current = 'Home';

const App: () => React$Node = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={state => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);
        if (previousRouteName !== currentRouteName) {
          // can do screen tracking here if desired
          console.log(previousRouteName, currentRouteName);
        }
        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
      }}>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen name="MainStack" component={MainStack} options={{ headerShown: false }} />
        <RootStack.Screen name="OnboardingStack" component={OnboardingStack} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
};

export default App;
