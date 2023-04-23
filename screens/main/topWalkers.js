import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {GlobalStyles, Colors} from '../../styles';
import {Api, Realm, Strings} from '../../lib';
import numeral from 'numeral';

export default function TopWalkersScreen() {
  const safeAreaInsets = useSafeArea();

  const [deviceId, setDeviceId] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [walkers, setWalkers] = useState();

  const isCancelledRef = useRef(false);

  useEffect(() => {
    fetchData();
    return () => {
      isCancelledRef.current = true;
    };
  }, []);

  const fetchData = () => {
    setRefreshing(true);
    isCancelledRef.current = false;
    Promise.all([Realm.getUser(), Realm.getContest()])
      .then(([user, contest]) => {
        setDeviceId(user?.id);
        return Api.leaderboard.get(user?.id, contest?.id);
      })
      .then(response => {
        if (!isCancelledRef.current) {
          const newWalkers = response.data?.payload?.leaderboard;
          setWalkers(newWalkers);
          setRefreshing(false);
        }
      });
  };

  const positionFontSize = num => {
    const baseFontSize = 30;
    const fontSizeMultiplier = 4;
    const numLength = num?.toString().length ?? 1;

    return baseFontSize - (numLength - 1) * fontSizeMultiplier;
  };

  const positionCard = (participant, userId, additionalStyles = {}) => {
    return (
      <View
        key={participant.rank}
        style={[styles.walkerContainer, additionalStyles]}>
        <View style={styles.walkerIndex}>
          <View style={styles.walkerIndexBorder}>
            <Text
              style={[
                styles.walkerIndexFont,
                {fontSize: positionFontSize(participant.rank)},
              ]}>
              {participant.rank}
            </Text>
          </View>
        </View>
        <View style={styles.walkerText}>
          <Text style={styles.walkerPosition}>
            {participant.device_id === userId
              ? Strings.leaderBoard.thisIsYou
              : `${Strings.leaderBoard.walkerGeneral} #${numeral(
                  participant.rank,
                ).format('0,0')}`}
          </Text>
          <Text style={styles.walkerScore}>
            {numeral(participant.steps).format('0,0')}
          </Text>
        </View>
      </View>
    );
  };

  const user = walkers?.find(o => o.device_id === deviceId);
  let flyoutState = user && user.rank > 10;

  return (
    <SafeAreaView style={[GlobalStyles.container, styles.background]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={Colors.primary.lightGray}
            refreshing={refreshing}
            onRefresh={fetchData}
          />
        }>
        <View style={GlobalStyles.content}>
          <View style={[styles.pageTitle]}>
            <Image
              style={[styles.pageTitleIcon]}
              source={require('../../assets/top_walkers_trophy.png')}
            />
            <Image
              style={[styles.pageTitleText]}
              source={require('../../assets/top_walkers.png')}
            />
          </View>
          {refreshing ? (
            <ActivityIndicator
              size="large"
              style={[styles.spinner]}
              color={Colors.primary.lightGray}
            />
          ) : (
            walkers?.slice(0, 10).map((participant, index) => {
              const additionalStyles =
                deviceId === participant.device_id
                  ? {backgroundColor: Colors.accent.teal}
                  : {};
              return positionCard(
                participant,
                deviceId,
                additionalStyles,
                index + 1,
              );
            })
          )}

          {walkers && walkers.length > 10 && (
            <View style={styles.ellipsisContainer}>
              <View style={styles.verticalEllipsis} />
              <View style={styles.verticalEllipsis} />
              <View style={styles.verticalEllipsis} />
            </View>
          )}

          {flyoutState && <View style={[styles.flyoutPlaceholder]} />}
        </View>
      </ScrollView>

      {flyoutState &&
        positionCard(user, deviceId, {
          ...styles.flyout,
          bottom: safeAreaInsets.bottom,
        })}
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
    height: 144,
  },
  pageTitleIcon: {
    resizeMode: 'contain',
    width: '24%',
  },
  pageTitleText: {
    resizeMode: 'contain',
    width: '72%',
    marginLeft: 16,
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
    overflow: 'hidden',
  },
  walkerIndexFont: {
    ...GlobalStyles.boxShadow,
    color: Colors.secondary.blue,
    fontWeight: 'bold',
    overflow: 'hidden',
    position: 'absolute',
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
  flyoutPlaceholder: {
    height: 64,
  },
  flyout: {
    backgroundColor: Colors.accent.teal,
    position: 'absolute',
    bottom: 0,
    marginLeft: 16,
    marginRight: 16,
  },
  ellipsisContainer: {
    marginRight: 'auto',
    marginLeft: 43,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 30,
    marginBottom: 16,
  },
  verticalEllipsis: {
    ...GlobalStyles.boxShadow,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary.lightGray,
  },
  spinner: {
    paddingTop: 96,
  },
});
