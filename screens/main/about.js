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

export default function InfoScreen({navigation}) {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <PageTitle style={styles.pageTitle} title="iWalk Information" />
          <View style={{flex: 1, alignSelf: 'stretch'}}>
            <InfoBox title="Walk!"
                     icon="directions-walk"
                     iconSize={80}
                     iconColor={Colors.accent.teal}>
              This app will count your total steps taken each day, just carry your phone with you when you’re walking.
            </InfoBox>
            <InfoBox title="Record!"
                     icon="play-circle-filled"
                     iconSize={80}
                     iconColor={Colors.primary.purple}>
              Use this feature to track your walks. Challenge yourself to increase distance and time!
            </InfoBox>
            <InfoBox title="Win!"
                     icon="star-border"
                     iconSize={80}
                     iconColor={Colors.accent.orange}>
              At the end of the program, the top 10 walkers will be contacted by email to claim their prize. Prizes include SF Giants game tickets, signed team gear, and a special grand prize!
            </InfoBox>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    ...GlobalStyles.boxShadow,
    ...GlobalStyles.content,
    ...GlobalStyles.rounded
  }
});
