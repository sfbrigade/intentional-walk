import React, {useEffect, useState} from 'react';
import {
  VirtualizedList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {Button, InfoBox, PageTitle, RecordedWalk} from '../../components';
import {Colors, GlobalStyles} from '../../styles';
import {Realm} from '../../lib';

export default function RecordedWalksScreen({navigation}) {
  const [recordedWalks, setRecordedWalks] = useState(null);

  useEffect(() => {
    Realm.open().then(realm => {
      setRecordedWalks(realm.objects('IntentionalWalk').sorted([['end', true]]));
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <PageTitle style={styles.pageTitle} title="My Recorded Walks" />
      { recordedWalks && recordedWalks.length == 0 &&
        <RecordedWalk style={styles.walk} title="No Recorded Walks" />
      }
      { recordedWalks && recordedWalks.length > 0 &&
        <VirtualizedList
          style={styles.list}
          data={recordedWalks}
          getItemCount={(data) => data.length}
          getItem={(data, i) => data[i]}
          renderItem={({item}) => <RecordedWalk style={styles.walk} key={item.id} walk={item} />}
          keyExtractor={item => item.id} />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8
  },
  list: {
  },
  walk: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16
  }
});
