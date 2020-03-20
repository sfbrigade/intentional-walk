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
import {TLInformation} from '../../translations';

export default function InfoScreen({navigation}) {

  const onNextPress = () => {
    navigation.navigate('Permissions');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={GlobalStyles.h1}>{TLInformation.youreSignedUp}</Text>
          <View style={{flex: 1, alignSelf: 'stretch'}}>
            <Text style={styles.subtitle}>{TLInformation.subtitle}</Text>
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
          <Button style={styles.button} onPress={onNextPress}>{TLInformation.next}</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
