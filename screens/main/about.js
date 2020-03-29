import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {Button, InfoBox, PageTitle} from '../../components';
import {Colors, GlobalStyles} from '../../styles';
import {Strings} from '../../lib';

export default function InfoScreen({navigation}) {
  Strings.setLanguage('zh');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={GlobalStyles.content}>
          <PageTitle style={styles.pageTitle} title={Strings.common.about} />
          <View style={{flex: 1, alignSelf: 'stretch'}}>
            <InfoBox title={Strings.about.what}
                     icon="directions-walk"
                     iconSize={80}
                     iconColor={Colors.accent.teal}>
              {Strings.about.whatText}
            </InfoBox>
            <InfoBox title={Strings.about.dates}
                     icon="play-circle-filled"
                     iconSize={80}
                     iconColor={Colors.primary.purple}>
              {Strings.about.datesText}
            </InfoBox>
            <InfoBox title={Strings.about.prize}
                     icon="star-border"
                     iconSize={80}
                     iconColor={Colors.accent.orange}>
              {Strings.about.prizeText}
            </InfoBox>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
