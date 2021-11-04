import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import loadLocalResource from 'react-native-local-resource';
import Autolink from 'react-native-autolink';
import {PageTitle} from '../../components';
import {GlobalStyles} from '../../styles';
import {Strings} from '../../lib';

import Privacy from '../../assets/privacy';

export default function PrivacyScreen({navigation}) {
  const [text, setText] = useState();
  loadLocalResource(Privacy[Strings.getLanguage()]).then(newText =>
    setText(newText),
  );
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView>
        <View style={GlobalStyles.content}>
          <PageTitle title={Strings.common.privacyPolicy} />
          <View style={GlobalStyles.content}>
            <Autolink text={text} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
