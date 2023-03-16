import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { GlobalStyles, Colors } from '../../styles';
import { Realm, Strings } from '../../lib';

export default function TopWalkersScreen() {
  const [walkers, setWalkers] = useState([]);
  const [uuid, setUUID] = useState('00000000-0000-0000-0000-000000000000')
  const [flyoutState, setFlyoutState] = useState(false)

  const dummyData = [
    { id: '7121e191-0b31-43a3-a7f0-000000000010', position: 1, steps: 999590355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000020', position: 2, steps: 71490355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000000', position: 3, steps: 5390355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000001', position: 4, steps: 3290355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000002', position: 5, steps: 1190355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000003', position: 6, steps: 1110355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000004', position: 7, steps: 1100355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000005', position: 8, steps: 1100055 },
    { id: '7121e191-0b31-43a3-a7f0-000000000006', position: 9, steps: 1100005 },
    { id: '7121e191-0b31-43a3-a7f0-000000000007', position: 10, steps: 190355 },
    { id: '7121e191-0b31-43a3-a7f0-2c07bc7da9ab', position: 98, steps: 190255 },
    { id: '7121e191-0b31-43a3-a7f0-000000000009', position: 99, steps: 190155 },
    { id: '7121e191-0b31-43a3-a7f0-000000000060', position: 100, steps: 90055 },
    { id: '7121e191-0b31-43a3-a7f0-000000000070', position: 101, steps: 90005 },
    { id: '7121e191-0b31-43a3-a7f0-000000000080', position: 102, steps: 90000 },
    { id: '7121e191-0b31-43a3-a7f0-000000000090', position: 103, steps: 80355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000700', position: 9998, steps: 9035 },
    { id: '7121e191-0b31-43a3-a7f0-000000000800', position: 9999, steps: 8355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000900', position: 10000, steps: 935 },
    { id: '7121e191-0b31-43a3-a7f0-000000007000', position: 10001, steps: 355 },
  ];

  useEffect(async () => {
    setUUID((await Realm.getUser()).id);

    setWalkers(dummyData);
    const userData = walkers.find(o => o.id === uuid);
    if (userData && userData.position > 10) setFlyoutState(true);
  }, []);

  const addCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const positionFontSize = (num) => {
    const baseFontSize = 30;
    const fontSizeMultiplier = 4;
    const numLength = num.toString().length;

    return (baseFontSize - ((numLength - 1) * fontSizeMultiplier));
  }

  return (
    <SafeAreaView style={[GlobalStyles.container, styles.background]}>
      <ScrollView>
        <View style={GlobalStyles.content}>
          <View style={[styles.pageTitle]}>
            <Image
              style={{ resizeMode: 'contain', width: `${25.75}%` }}
              source={require('../../assets/top-walkers-trophy.png')}
            />
            <Image
              style={{ resizeMode: 'contain', width: `${74.25}%` }}
              source={require('../../assets/top-walkers.png')}
            />
          </View>

          {walkers.map((participant, index) => {
            return (
              <View
                key={participant.position}
                style={[styles.walkerContainer, (uuid === participant.id ? { backgroundColor: Colors.accent.teal } : {})]}
              >
                <View style={styles.walkerIndex}>
                  <View style={styles.walkerIndexBorder}>
                    <Text style={[styles.walkerIndexFont, { fontSize: positionFontSize(participant.position) }]}>
                      {participant.position}
                    </Text>
                  </View>
                </View>
                <Text style={styles.walkerText}>
                  {`Walker #${addCommas(participant.position)}`}
                </Text>
                <Text style={styles.walkerScore}>
                  {addCommas(participant.steps)}
                </Text>
              </View>
            )
          })}

          {flyoutState ?
            <View
              style={{ height: 64 }}
            ></View>
            : <></>}

        </View>
      </ScrollView>

      {flyoutState ?
        <View style={[styles.walkerContainer, { backgroundColor: Colors.accent.teal, position: 'absolute', bottom: 0, marginLeft: 16, marginRight: 16 }]}>
          <View style={styles.walkerIndex}>
            <View style={styles.walkerIndexBorder}>
              <Text style={[styles.walkerIndexFont, { fontSize: positionFontSize(3) }]}>
                {3}
              </Text>
            </View>
          </View>
          <Text style={styles.walkerText}>
            {`Walker #${addCommas(3)}`}
          </Text>
          <Text style={styles.walkerScore}>
            {addCommas(5390355)}
          </Text>
        </View>
        : <></>}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.primary.purple,
  },
  pageTitle: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 144
  },
  walkerContainer: {
    ...GlobalStyles.rounded,
    ...GlobalStyles.boxShadow,
    backgroundColor: Colors.primary.lightGray,
    height: 64,
    paddingTop: 16,
    paddingBottom: 6,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walkerIndex: {
    ...GlobalStyles.h2,
    height: 'auto',
    width: '24%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  walkerIndexBorder: {
    position: 'absolute',
    top: -26,
    height: 52,
    width: 52,
    borderColor: Colors.secondary.blue,
    borderRadius: 26,
    borderWidth: 3,
    backgroundColor: Colors.accent.orange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  walkerIndexFont: {
    ...GlobalStyles.boxShadow,
    color: Colors.secondary.blue,
    fontWeight: 'bold',
    overflow: 'hidden'
  },
  walkerText: {
    ...GlobalStyles.h2,
    color: Colors.accent.deepPurple,
    textAlign: 'left',
    height: 'auto',
    width: '39.5%',
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  walkerScore: {
    ...GlobalStyles.h2,
    color: Colors.accent.deepPurple,
    textAlign: 'left',
    paddingRight: 16,
    height: 'auto',
    width: '36.5%',
    textAlign: "right",
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
});
