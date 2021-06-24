/**
 * @format
 */
// https://reactnavigation.org/docs/getting-started/#installing-dependencies-into-a-bare-react-native-project
// To finalize installation of react-native-gesture-handler, add the following at the top (make sure it's at the top and there's nothing else before it) of your entry file, such as index.js
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
