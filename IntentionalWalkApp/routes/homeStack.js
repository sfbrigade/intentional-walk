import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Welcome from '../screens/welcome';
import SignUp from '../screens/signup';

const screens = {
  Welcome: {
    screen: Welcome,
  },
  SignUp: {
    screen: SignUp,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
