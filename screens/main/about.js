import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {InfoBox, PageTitle} from '../../components';
import {Colors, GlobalStyles} from '../../styles';
import {Realm, Strings} from '../../lib';
import moment from 'moment';

export default function InfoScreen({navigation}) {
  const [contest, setContest] = useState(null);

  useEffect(() => {
    Realm.getContest().then(newContest =>
      setContest(newContest ? newContest.toObject() : null),
    );
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView>
        <View style={GlobalStyles.content}>
          <PageTitle style={styles.title} title={Strings.common.about} />
          {contest && (
            <View style={styles.contest}>
              <InfoBox
                style={styles.infoBox}
                title={Strings.about.what}
                icon="directions-walk"
                iconSize={80}
                iconColor={Colors.accent.teal}>
                {Strings.formatString(
                  Strings.about.whatText,
                  Strings.formatString(
                    Strings.common.range,
                    moment(contest.start).format(Strings.common.rangeFrom),
                    moment(contest.end).format(Strings.common.rangeTo),
                  ),
                )}
              </InfoBox>
              <InfoBox
                style={styles.infoBox}
                title={Strings.about.dates}
                icon="date-range"
                iconSize={80}
                iconColor={Colors.primary.lightGreen}>
                {Strings.formatString(
                  Strings.about.datesText,
                  moment(contest.start).format(Strings.common.date),
                  Strings.formatString(
                    Strings.common.range,
                    moment(contest.start).format(Strings.common.rangeFrom),
                    moment(contest.end).format(Strings.common.rangeTo),
                  ),
                )}
              </InfoBox>
              <InfoBox
                style={styles.infoBox}
                title={Strings.about.prize}
                icon="star-border"
                iconSize={80}
                iconColor={Colors.accent.orange}>
                {Strings.about.prizeText}
              </InfoBox>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 48,
  },
  infoBox: {
    marginBottom: 30,
  },
  contest: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
