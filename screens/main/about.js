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
import {TLInformation} from '../../translations/';

export default function InfoScreen({navigation}) {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={GlobalStyles.content}>
          <PageTitle style={styles.pageTitle} title={TLInformation.title} />
          <View style={{flex: 1, alignSelf: 'stretch'}}>
            <InfoBox title={TLInformation.walk}
                     icon="directions-walk"
                     iconSize={80}
                     iconColor={Colors.accent.teal}>
              {TLInformation.walkText}
            </InfoBox>
            <InfoBox title={TLInformation.record}
                     icon="play-circle-filled"
                     iconSize={80}
                     iconColor={Colors.primary.purple}>
              {TLInformation.recordText}
            </InfoBox>
            <InfoBox title={TLInformation.win}
                     icon="star-border"
                     iconSize={80}
                     iconColor={Colors.accent.orange}>
              {TLInformation.winText}
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
