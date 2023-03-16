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
import { Api, Realm, Strings } from '../../lib';
import numeral from 'numeral';

export default function TopWalkersScreen() {
  const [flyoutState, setFlyoutState] = useState(false);
  const [uuid, setUUID] = useState('00000000-0000-0000-0000-000000000000');
  const [user, setUser] = useState({id: '00000000-0000-0000-0000-000000000000', position: 1, steps: 1});
  const [walkers, setWalkers] = useState([]);

  const dummyData = [
    { id: '7121e191-0b31-43a3-a7f0-000000000001', position: 1, steps: 999590355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000002', position: 2, steps: 71490355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000003', position: 3, steps: 5390355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000004', position: 4, steps: 3290355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000005', position: 5, steps: 1190355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000006', position: 6, steps: 1110355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000007', position: 7, steps: 1100355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000008', position: 8, steps: 1100055 },
    { id: '7121e191-0b31-43a3-a7f0-000000000009', position: 9, steps: 1100005 },
    { id: '7121e191-0b31-43a3-a7f0-000000000010', position: 10, steps: 190355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000011', position: 98, steps: 190255 },
    { id: '7121e191-0b31-43a3-a7f0-000000000012', position: 99, steps: 190155 },
    { id: '7121e191-0b31-43a3-a7f0-000000000013', position: 100, steps: 90055 },
    { id: '7121e191-0b31-43a3-a7f0-000000000014', position: 101, steps: 90005 },
    { id: '7121e191-0b31-43a3-a7f0-000000000015', position: 500, steps: 90000 },
    { id: '7121e191-0b31-43a3-a7f0-000000000016', position: 800, steps: 80355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000017', position: 9998, steps: 9035 },
    { id: '7121e191-0b31-43a3-a7f0-000000000018', position: 9999, steps: 8355 },
    { id: '7121e191-0b31-43a3-a7f0-000000000019', position: 10000, steps: 935 },
    { id: '7121e191-0b31-43a3-a7f0-000000000020', position: 88888, steps: 355 },
  ];

  useEffect(async () => {
    Realm.getUser().then(user => {
      setUUID(user.id);
      return user.id
    }).then(id => {

      // Api
      dummyData[Math.floor(Math.random()*dummyData.length)].id = id;
      setWalkers(dummyData);

      const userData = dummyData.find(o => o.id === id);
      setUser(userData);
      if (userData && userData.position > 10) setFlyoutState(true);
    })
  }, []);

  const positionFontSize = (num) => {
    const baseFontSize = 30;
    const fontSizeMultiplier = 4;
    const numLength = num.toString().length;

    return (baseFontSize - ((numLength - 1) * fontSizeMultiplier));
  }

  const positionCard = (participant, userId, additionalStyles = {}) => {
    return(
      <View
        key={participant.position}
        style={[styles.walkerContainer, additionalStyles]}
      >
        <View style={styles.walkerIndex}>
          <View style={styles.walkerIndexBorder}>
            <Text style={[styles.walkerIndexFont, { fontSize: positionFontSize(participant.position) }]}>
              {participant.position}
            </Text>
          </View>
        </View>
        <View style={styles.walkerText}>
          <Text style={styles.walkerPosition}>
            {`${participant.id === userId? "This is You!" : `Walker #${numeral(participant.position).format('0,0')}`}`}
          </Text>
          <Text style={styles.walkerScore}>
            {numeral(participant.steps).format('0,0')}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={[GlobalStyles.container, styles.background]}>
      <ScrollView>
        <View style={GlobalStyles.content}>
          <View style={[styles.pageTitle]}>
            <Image
              style={{ resizeMode: 'contain', width: `${24}%` }}
              source={require('../../assets/top_walkers_trophy.png')}
            />
            <Image
              style={{ resizeMode: 'contain', width: `${72}%`, marginLeft: 16 }}
              source={require('../../assets/top_walkers.png')}
            />
          </View>

          {walkers.map((participant) => {
            const additionalStyles = (uuid === participant.id ? { backgroundColor: Colors.accent.teal } : {})
            return positionCard(participant, uuid, additionalStyles);
          })}

          {flyoutState ?
            <View
              style={{ height: 64 }}
            ></View>
            : <></>}

        </View>
      </ScrollView>

      {flyoutState ?
        positionCard(user, uuid, styles.flyout)
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
    overflow: 'hidden'
  },
  walkerIndexFont: {
    ...GlobalStyles.boxShadow,
    color: Colors.secondary.blue,
    fontWeight: 'bold',
    overflow: 'hidden',
    position: "absolute"
  },
  walkerText: {
    width: '76%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  walkerPosition: {
    ...GlobalStyles.h2,
    color: Colors.accent.deepPurple,
  },
  walkerScore: {
    ...GlobalStyles.h2,
    color: Colors.accent.deepPurple,
  },
  flyout: {
    backgroundColor: Colors.accent.teal,
    position: 'absolute',
    bottom: 0,
    marginLeft: 16,
    marginRight: 16
  }
});
