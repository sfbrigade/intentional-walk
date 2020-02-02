import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {CheckBox} from 'react-native-elements';

export default function SignUp({navigation}) {
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState(null);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'purple',
          marginTop: 20,
        }}>
        iWalk
      </Text>
      <View style={{flex: 0, flexDirection: 'row', marginTop: 10}}>
        <Image source={require('../calfresh_logo.png')} style={styles.image} />
        <Image source={require('../sfgiants_logo.png')} style={styles.image} />
      </View>
      <Text style={{fontSize: 26, margin: 20}}>
        Welcome to Intentional Walk!
      </Text>
      <Text style={styles.info}>
        Intentional Walk is a FREE community walking program that runs from July
        1 - July 31, 2020. The program is open to all San Francisco residents.
        Top Walkers will be elligible for prizes form the San Francisco Giants
        including game tickets and team gear. Get started by signing in below!
      </Text>
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <View>
          <TextInput style={styles.input} placeholder="enter email"></TextInput>
        </View>
        <Text>please send me program updates via email</Text>
        <View>
          <TextInput style={styles.input} placeholder="enter zip"></TextInput>
        </View>
      </View>
      <TouchableOpacity style={styles.signup}>
        <Text style={styles.text}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  info: {
    margin: 10,
    fontSize: 18,
    fontFamily: 'Arial',
  },
  input: {
    height: 60,
    width: 320,
    borderWidth: 0.5,
    borderRadius: 5,
    margin: 20,
  },
  signup: {
    position: 'absolute',
    backgroundColor: 'grey',
    borderRadius: 7,
    height: 60,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 100,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    resizeMode: 'stretch',
    height: 75,
    width: 150,
    margin: 10,
  },
});
