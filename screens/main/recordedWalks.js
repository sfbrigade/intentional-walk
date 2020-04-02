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
    <SafeAreaView style={GlobalStyles.container}>
      { recordedWalks &&
        <VirtualizedList
          style={styles.list}
          data={recordedWalks}
          getItemCount={(data) => data.length + 1}
          getItem={(data, i) => i == 0 ? {id: ""} : data[i - 1]}
          renderItem={({item}) => {
            if (item.id != "") {
              return <RecordedWalk style={styles.walk} key={item.id} walk={item} />;
            } else {
              return <>
                <PageTitle style={styles.pageTitle} title={Strings.common.myRecordedWalks} />
                { recordedWalks.length == 0 &&
                  <RecordedWalk style={styles.walk} title={Strings.common.noWalksYet} /> }
              </>;
            }
          }}
          keyExtractor={item => item.id} />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
