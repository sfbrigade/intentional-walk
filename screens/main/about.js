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
import {TLEntries, TLText} from '../../translations/';

export default function InfoScreen({navigation}) {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={GlobalStyles.content}>
          <PageTitle style={styles.pageTitle} title={TLText.iWalkInformation} />
          <View style={{flex: 1, alignSelf: 'stretch'}}>
            <InfoBox title={TLText.walk + "!"}
                     icon="directions-walk"
                     iconSize={80}
                     iconColor={Colors.accent.teal}>
              {TLEntries.walkText}
            </InfoBox>
            <InfoBox title={TLText.record + "!"}
                     icon="play-circle-filled"
                     iconSize={80}
                     iconColor={Colors.primary.purple}>
              {TLEntries.recordText}
            </InfoBox>
            <InfoBox title={TLText.win + "!"}
                     icon="star-border"
                     iconSize={80}
                     iconColor={Colors.accent.orange}>
              {TLEntries.winText}
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
