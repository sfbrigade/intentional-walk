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

const links = [
  { title: "Parks & Rec Centers", url: "https://sfrecpark.org/facilities" },
  { title: "Hiking Trails in SF", url: "https://sfrecpark.org/448/Trails-Hikes" },
  { title: "Guided Walks", url: "https://sfrecpark.org/1244/Healthy-Parks-Healthy-People" },
  { title: "Exercise & Fitness Activities", url: "https://apm.activecommunities.com/sfrecpark/Activity_Search?detailskeyword=&IsAdvanced=True&ddlSortBy=Activity+name&ActivityCategoryID=29&DaysOfWeek=0000000&SearchFor=2&SearchLevelID=2&maxAge=100&NumberOfItemsPerPage=20&IsSearch=true" }
]
const linkBoxes = links.map( (link, index) => <LinkButton key={index} title={link.title} url={link.url} /> );
export default function WhereToWalkScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <PageTitle title="Where to Walk" />
        { linkBoxes }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
