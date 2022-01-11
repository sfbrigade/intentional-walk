/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Button, Input, MultipleChoiceQuestion, MultipleChoiceAnswer, PaginationDots, Popup } from '../../components';
import { GlobalStyles, Colors } from '../../styles';
import { Api, Realm, Strings } from '../../lib';

export default function WhatIsRaceScreen({ navigation, route }) {
    const user = route.params.user;
    const [checked, setChecked] = useState([]);
    const [raceOther, setRaceOther] = useState('');
    const [isLoading, setLoading] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const onNextPress = () => {
        const values = [];
        options.map(o => {
            if (checked.indexOf(o.id) >= 0) {
                values.push(o.value);
            }
        });
        if (raceOther.trim() === '' && checked.indexOf(98) >= 0){
            // TODO: Update to use Strings && get translations
            setAlertTitle('Please fill in');
            setAlertMessage('Do not leave the field blank');
            setShowAlert(true);
            return;
        }
        if (checked.indexOf(98) >= 0) {
            values.push('OT');
            user.race_other = raceOther.trim();
        } else {
            user.race_other = null;
        }
        if (values.length > 0) {
            user.race = values;
        } else {
            user.race = [];
        }
        navigation.navigate('WhatIsGenderIdentity', { user: user });
    };

    const isValid = () => {
        return !isLoading && checked.length > 0;
    };

    const options = [
        { id: 1, value: 'NA', text: Strings.whatIsYourRace.americanNative },
        { id: 2, value: 'AS', text: Strings.whatIsYourRace.asian },
        { id: 3, value: 'BL', text: Strings.whatIsYourRace.black },
        { id: 4, value: 'PI', text: Strings.whatIsYourRace.pacificIsl },
        { id: 5, value: 'WH', text: Strings.whatIsYourRace.white },
    ];

    const pressCheck = (id) => {
        let whatsChecked = [...checked];
        const declinedID = 99;
        if (id === declinedID) {
            whatsChecked = [declinedID];
        } else {
            if (whatsChecked.indexOf(id) >= 0) {
                whatsChecked.splice(whatsChecked.indexOf(id), 1);
            } else if (whatsChecked.indexOf(id) === -1) {
                whatsChecked.push(id);
            }
            if (whatsChecked.indexOf(declinedID) >= 0) {
                whatsChecked.splice(whatsChecked.indexOf(declinedID), 1);
            }
        }
        setChecked(whatsChecked);
    };

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <ScrollView style={GlobalStyles.container}>
                <View style={styles.content}>
                    <MultipleChoiceQuestion
                        text={Strings.whatIsYourRace.question}
                        subText={Strings.whatIsYourRace.questionSub}
                        style={styles.content}
                    >
                        {options.map(o =>
                            <MultipleChoiceAnswer
                                key={o.id}
                                text={o.text}
                                checked={checked.indexOf(o.id) >= 0}
                                onPress={() => pressCheck(o.id)}
                                editable={!isLoading}
                            />
                        )}
                        <MultipleChoiceAnswer
                            text={Strings.whatIsYourRace.other}
                            subText={Strings.whatIsYourRace.otherSub}
                            checked={checked.indexOf(98) >= 0}
                            onPress={() => pressCheck(98)}
                            editable={!isLoading}
                        />
                        <Input
                            placeholder={Strings.whatIsYourRace.otherSub}
                            onChangeText={newValue => setRaceOther(newValue)}
                            returnKeyType="next"
                            style={[
                                (checked.indexOf(98) >= 0 ? { display: 'flex' } : { display: 'none' }),
                                styles.input,
                            ]}
                            placeholderTextColor={'#C3C3C3'}
                            editable={!isLoading}
                        />
                        <MultipleChoiceAnswer
                            text={Strings.whatIsYourRace.declineToAnswer}
                            checked={checked.indexOf(99) >= 0}
                            onPress={() => pressCheck(99)}
                            editable={!isLoading}
                        />
                    </MultipleChoiceQuestion>
                    <View style={styles.content}>
                        <Button
                            style={styles.button}
                            isEnabled={isValid()}
                            onPress={onNextPress}
                        >
                            {Strings.common.next}
                        </Button>
                        <PaginationDots currentPage={3} totalPages={6} />
                    </View>
                </View>
            </ScrollView>
            <Popup isVisible={showAlert} onClose={() => setShowAlert(false)}>
                <View style={GlobalStyles.centered}>
                    <Text style={GlobalStyles.h1}>{alertTitle}</Text>
                    <Text style={[GlobalStyles.h2, styles.alertText]}>
                        {alertMessage}
                    </Text>
                    <Button style={styles.button} onPress={() => setShowAlert(false)}>
                        {Strings.common.okay}
                    </Button>
                </View>
            </Popup>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: {
        ...GlobalStyles.content,
        alignItems: 'center',
    },
    alertText: {
        textAlign: 'center',
        marginBottom: 48,
    },
    button: {
        width: 180,
    },
    input: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: Colors.primary.purple,
        marginTop: 16,
        marginBottom: 16,
        paddingLeft: 16,
    },
});
