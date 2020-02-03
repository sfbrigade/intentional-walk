import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Welcome from '../screens/welcome';
import SignUp from '../screens/signup';
import Info from '../screens/info';

const screens = {
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      title: null,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: null,
    },
  },
  Info: {
    screen: Info,
    navigationOptions: {
      title: null,
    },
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
