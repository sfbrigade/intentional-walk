import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {LinkButton, PageTitle} from '../../components';
import {GlobalStyles} from '../../styles';
import {Strings} from '../../lib';

export default function WhereToWalkScreen() {
  const [buttonHeight, setButtonHeight] = useState();

  const buttonStyle = {};
  if (buttonHeight) {
    buttonStyle.height = buttonHeight;
  }

  const links = [
    {
      title: Strings.whereToWalk.parksAndRecCenters,
      url: 'https://sfrecpark.org/facilities',
    },
    {
      title: Strings.whereToWalk.hikingTrailsInSF,
      url: 'https://sfrecpark.org/448/Trails-Hikes',
    },
    {
      title: Strings.whereToWalk.guidedWalks,
      url: 'https://sfrecpark.org/1226/The-EcoCenter-at-Herons-Head-Park',
    },
    {
      title: Strings.whereToWalk.exerciseAndFitnessActivities,
      url: 'https://apm.activecommunities.com/sfrecpark/Activity_Search',
    },
  ];

  function onHeight(height) {
    if (height > (buttonHeight ?? 0)) {
      setButtonHeight(height);
    }
  }

  const linkBoxes = links.map((link, index) => (
    <LinkButton
      key={index}
      onHeight={onHeight}
      style={buttonStyle}
      title={link.title}
      url={link.url}
    />
  ));
  const screenDims = Dimensions.get('screen');
  const width = Math.round(screenDims.width / 3);
  const height = Math.round((width * 763) / 500);
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView>
        <View style={GlobalStyles.content}>
          <PageTitle title={Strings.common.whereToWalk} />
          <Image
            source={require('../../assets/sfrecparks_logo.png')}
            style={[styles.image, {width: width, height: height}]}
          />
          <Text style={[GlobalStyles.p2, styles.options]}>
            {Strings.whereToWalk.options}
          </Text>
          {linkBoxes}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 24,
    marginBottom: 24,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  options: {
    textAlign: 'center',
    marginBottom: 16,
  },
});
