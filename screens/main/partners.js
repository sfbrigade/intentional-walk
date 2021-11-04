import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PageTitle} from '../../components';
import {Colors, GlobalStyles} from '../../styles';
import {Strings} from '../../lib';

export default function PartnersScreen({navigation}) {
  const screenDims = Dimensions.get('screen');
  const width = Math.round((screenDims.width - 123) / 2);

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView>
        <View style={GlobalStyles.content}>
          <PageTitle title={Strings.common.programPartners} />
          <Text style={[GlobalStyles.h2, styles.thanks]}>
            {Strings.partners.thanks}
          </Text>
          <Text style={[GlobalStyles.p1, styles.text]}>
            {Strings.partners.text}
          </Text>
        </View>
        <View style={styles.row}>
          <Image
            style={[styles.logo, {width}]}
            source={require('../../assets/calfresh_logo.png')}
          />
          <View style={styles.separator} />
          <Image
            style={[styles.logo, {width}]}
            source={require('../../assets/cdph_logo.png')}
          />
        </View>
        <View style={styles.row}>
          <Image
            style={[styles.logo, {width}]}
            source={require('../../assets/sfdph_logo.png')}
          />
          <View style={styles.separator} />
          <Image
            style={[styles.logo, {width}]}
            source={require('../../assets/c4sf_logo.png')}
          />
        </View>
        <View style={styles.row}>
          <Image
            style={[styles.logo, {width}]}
            source={require('../../assets/sfgiants_logo.png')}
          />
          <View style={styles.separator} />
          <Image
            style={[styles.logo, {width}]}
            source={require('../../assets/sfrecparks_logo.png')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  thanks: {
    alignSelf: 'center',
    maxWidth: 240,
    textAlign: 'center',
    marginBottom: 16,
  },
  text: {
    marginBottom: 25,
  },
  row: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    maxHeight: 110,
    marginTop: 10,
    marginBottom: 10,
  },
  separator: {
    width: 3,
    backgroundColor: Colors.primary.darkGreen,
    alignSelf: 'stretch',
  },
});
