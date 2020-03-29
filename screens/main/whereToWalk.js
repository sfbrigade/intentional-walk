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
import {Button, InfoBox, LinkButton, PageTitle} from '../../components';
import {Colors, GlobalStyles} from '../../styles';
import {Strings} from '../../lib';

export default function WhereToWalkScreen({navigation}) {

  const links = [
    { title: Strings.whereToWalk.parksAndRecCenters, url: "https://sfrecpark.org/facilities" },
    { title: Strings.whereToWalk.hikingTrailsInSF, url: "https://sfrecpark.org/448/Trails-Hikes" },
    { title: Strings.whereToWalk.guidedWalks, url: "https://sfrecpark.org/1244/Healthy-Parks-Healthy-People" },
    { title: Strings.whereToWalk.exerciseAndFitnessActivities, url: "https://apm.activecommunities.com/sfrecpark/Activity_Search?detailskeyword=&IsAdvanced=True&ddlSortBy=Activity+name&ActivityCategoryID=29&DaysOfWeek=0000000&SearchFor=2&SearchLevelID=2&maxAge=100&NumberOfItemsPerPage=20&IsSearch=true" }
  ]
  const linkBoxes = links.map( (link, index) => <LinkButton key={index} style={styles.button} title={link.title} url={link.url} /> );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={GlobalStyles.content}>
          <PageTitle title={Strings.common.whereToWalk} />
          <Image source={require('../../assets/sfrecparks_logo.png')} style={styles.image} />
          <Text style={[GlobalStyles.p2, styles.options]}>{Strings.whereToWalk.options}</Text>
          { linkBoxes }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    marginTop: 16,
    marginBottom: 16,
    resizeMode: 'contain',
    width: 64,
    height: 98,
    alignSelf: 'center'
  },
  options: {
    textAlign: 'center',
    marginBottom: 16,
  }
});
