import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  WelcomeScreen,
  SignUpScreen,
  InfoScreen,
  PermissionsScreen,
  LoHOriginScreen,
  WhatIsRaceScreen,
  WhatIsGenderIdentityScreen,
  WhatIsSexualOrientationScreen,
  SetYourStepGoal,
} from '../screens/onboarding';
import {GoalProgressScreen} from '../screens/main';
import {Logo} from '../components';
import {Colors, GlobalStyles} from '../styles';
import {Strings} from '../lib';

const Stack = createStackNavigator();

export default function OnboardingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: null,
        headerBackImage: () => (
          <Icon name="chevron-left" size={28} color={Colors.primary.purple} />
        ),
        headerBackTitle: Strings.common.back.toUpperCase(),
        headerBackTitleVisible: true,
        headerTintColor: Colors.primary.purple,
        headerTitle: props => <Logo />,
        headerTitleContainerStyle: Platform.select({
          android: GlobalStyles.androidNavHeaderCentered,
        }),
      }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerLeft: null}}
      />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
      <Stack.Screen name="Permissions" component={PermissionsScreen} />

      <Stack.Screen name="LoHOrigin" component={LoHOriginScreen} />
      <Stack.Screen name="WhatIsRace" component={WhatIsRaceScreen} />
      <Stack.Screen
        name="WhatIsGenderIdentity"
        component={WhatIsGenderIdentityScreen}
      />
      <Stack.Screen
        name="WhatIsSexualOrientation"
        component={WhatIsSexualOrientationScreen}
      />
      <Stack.Screen name="SetYourStepGoal" component={SetYourStepGoal} />
      <Stack.Screen name="GoalProgress" component={GoalProgressScreen} />
    </Stack.Navigator>
  );
}
