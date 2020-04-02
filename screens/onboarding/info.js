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
import {Button, InfoBox} from '../../components';
import {Colors, GlobalStyles} from '../../styles';
import {Strings} from '../../lib';

export default function InfoScreen({navigation}) {

  const onNextPress = () => {
    navigation.navigate('Permissions');
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={GlobalStyles.h1}>{Strings.info.youreSignedUp}</Text>
          <View style={{flex: 1, alignSelf: 'stretch'}}>
            <Text style={styles.subtitle}>{Strings.info.fromHereText}</Text>
            <InfoBox title={Strings.info.walk}
                     icon="directions-walk"
                     iconSize={80}
                     iconColor={Colors.accent.teal}>
              {Strings.info.walkText}
            </InfoBox>
            <InfoBox title={Strings.info.record}
                     icon="play-circle-filled"
                     iconSize={80}
                     iconColor={Colors.primary.purple}>
              {Strings.info.recordText}
            </InfoBox>
            <InfoBox title={Strings.info.win}
                     icon="star-border"
                     iconSize={80}
                     iconColor={Colors.accent.orange}>
              {Strings.info.winText}
            </InfoBox>
          </View>
          <Button style={styles.button} onPress={onNextPress}>{Strings.common.next}</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    ...GlobalStyles.content,
    alignItems: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 48,
    fontSize: 17,
    color: Colors.primary.gray2,
  },
  button: {
    width: 180,
  },
});
