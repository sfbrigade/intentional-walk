import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native';
import {Button, InfoBox, PaginationDots} from '../../components';
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
          <View style={styles.info}>
            <Text style={styles.subtitle}>{Strings.info.fromHereText}</Text>
            <InfoBox
              title={Strings.info.walk}
              style={styles.infoBox}
              icon="directions-walk"
              iconSize={80}
              iconColor={Colors.accent.teal}>
              {Strings.info.walkText}
            </InfoBox>
            <InfoBox
              title={Strings.info.record}
              style={styles.infoBox}
              image={require('../../assets/record.png')}
              imageStyle={styles.recordButton}>
              {Strings.info.recordText}
            </InfoBox>
            <InfoBox
              title={Strings.info.win}
              style={styles.infoBox}
              icon="star-border"
              iconSize={80}
              iconColor={Colors.accent.orange}
              iconStyle={styles.starIcon}>
              {Strings.info.winText}
            </InfoBox>
          </View>
          <Button style={styles.button} onPress={onNextPress}>
            {Strings.common.next}
          </Button>
          <PaginationDots currentPage={6} totalPages={7} />
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
    marginBottom: 30,
    fontSize: 17,
    color: Colors.primary.gray2,
  },
  info: {
    flex: 1,
    alignSelf: 'stretch',
  },
  infoBox: {
    marginBottom: 30,
  },
  button: {
    width: 180,
  },
  recordButton: {
    marginTop: 20,
    width: 54,
    height: 54,
  },
  starIcon: {
    marginTop: 20,
  },
});
