import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import loadLocalResource from 'react-native-local-resource'
import Autolink from 'react-native-autolink';
import {Button, InfoBox, PageTitle} from '../../components';
import {Colors, GlobalStyles} from '../../styles';
import {Strings} from '../../lib';

import ContestRules from '../../assets/contestRules';

export default function ContestRulesScreen({navigation}) {
  const [text, setText] = useState();
  loadLocalResource(ContestRules[Strings.getLanguage()]).then(text => setText(text));
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView>
        <View style={GlobalStyles.content}>
          <PageTitle title={Strings.common.contestRules} />
          <View style={GlobalStyles.content}>
            <Autolink text={text} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
