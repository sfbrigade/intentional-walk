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

export default function RecordedWalksScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={GlobalStyles.content}>
          <PageTitle style={styles.pageTitle} title="My Recorded Walks" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
