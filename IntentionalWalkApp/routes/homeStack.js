import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Welcome from '../screens/welcome';

const screens = {
  Welcome: {
    screen: Welcome,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
