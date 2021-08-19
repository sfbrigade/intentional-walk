import React, {useEffect, useState} from 'react';
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
import {Realm, Strings} from '../../lib';
import moment from 'moment';


import ContestRules from '../../assets/contestRules';

export default function ContestRulesScreen({navigation}) {
  const [text, setText] = useState();
  const [contest, setContest] = useState(null);

  useEffect(() => {
    Realm.getContest().then(contest => setContest(contest ? contest.toObject() : null));
  }, []);

  let from = null, to = null, fromEn = null, toEn = null;
  // English Contest Rules use long form of date (rangeTo format)
  // Other languages use short form (dateSlash format)
  if (contest) {
    from = moment(contest.start).format(Strings.common.dateSlash);
    to = moment(contest.end).format(Strings.common.dateSlash);
    fromEn = moment(contest.start).format(Strings.common.rangeTo);
    toEn = moment(contest.end).format(Strings.common.rangeTo);
  } else {
    // default value just in case contest is unavailable
    from = "09/01/2021";
    to = "09/30/2021";
    fromEn = "September 1, 2021";
    toEn = "September 30, 2021";
  };
 
  loadLocalResource(ContestRules[Strings.getLanguage()]).then(text => setText(text));
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView>
        <View style={GlobalStyles.content}>
          <PageTitle title={Strings.common.contestRules} />
          <View style={GlobalStyles.content}>
            <Autolink text={Strings.formatString(text, fromEn, toEn, from, to)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
