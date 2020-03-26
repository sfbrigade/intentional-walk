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
import {TLEntries, TLText} from '../../translations/';

const links = [
  { title: TLText.parksAndRecCenters, url: "https://sfrecpark.org/facilities" },
  { title: TLText.hikingTrailsInSF, url: "https://sfrecpark.org/448/Trails-Hikes" },
  { title: TLText.guidedWalks, url: "https://sfrecpark.org/1244/Healthy-Parks-Healthy-People" },
  { title: TLText.exerciseAndFitnessActivities, url: "https://apm.activecommunities.com/sfrecpark/Activity_Search?detailskeyword=&IsAdvanced=True&ddlSortBy=Activity+name&ActivityCategoryID=29&DaysOfWeek=0000000&SearchFor=2&SearchLevelID=2&maxAge=100&NumberOfItemsPerPage=20&IsSearch=true" }
]

export default function WhereToWalkScreen({navigation}) {
  const linkBoxes = links.map( (link, index) => <LinkButton key={index} style={styles.button} title={link.title} url={link.url} /> );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={GlobalStyles.content}>
          <PageTitle title={TLText.whereToWalk} />
          <Image source={require('../../assets/sfrecparks_logo.png')} style={styles.image} />
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
  }
});
