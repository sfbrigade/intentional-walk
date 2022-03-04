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

export default function WhatIsGenderIdentityScreen({ navigation, route }) {
    const [gender, setGender] = useState(null);
    const [genderOther, setGenderOther] = useState('');

    const [checked, setChecked] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    function isValid() {
        let filled = true;
        if (genderOther.trim() === '' && checked === 98) {
            filled = false;
        }
        return !isLoading && checked > 0 && filled;
    }

    async function onNextPress() {
        setLoading(true);
        try {
            const user = await Realm.getUser();
            await Realm.write(() => {
                user.gender = gender;
                user.gender_other = checked === 98 ? genderOther.trim() : '';
            });
            await Api.appUser.update(user.id, {
                gender: user.gender,
                gender_other: user.gender_other,
            });
            setLoading(false);
            navigation.navigate('WhatIsSexualOrientation');
        } catch {
            setLoading(false);
            setAlertTitle(Strings.common.serverErrorTitle);
            setAlertMessage(Strings.common.serverErrorMessage);
            setShowAlert(true);
        }
    }

    const options = [
        { id: 1, value: 'CF', text: Strings.whatIsYourGenderIdentity.female },
        { id: 2, value: 'CM', text: Strings.whatIsYourGenderIdentity.male },
        { id: 3, value: 'TF', text: Strings.whatIsYourGenderIdentity.transFemale },
        { id: 4, value: 'TM', text: Strings.whatIsYourGenderIdentity.transMale },
        { id: 5, value: 'NB', text: Strings.whatIsYourGenderIdentity.nonBinary },
    ];

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <ScrollView style={GlobalStyles.container}>
                <View style={styles.content}>
                    <MultipleChoiceQuestion
                        text={Strings.whatIsYourGenderIdentity.question}
                        subText={Strings.whatIsYourGenderIdentity.questionSub}
                        style={styles.content}
                    >
                        {options.map(o =>
                            <MultipleChoiceAnswer
                                key={o.id}
                                text={o.text}
                                checked={checked === o.id}
                                onPress={() => {
                                    setChecked(o.id);
                                    setGender(o.value);
                                }}
                                editable={!isLoading}
                            />
                        )}
                        <MultipleChoiceAnswer
                            text={Strings.whatIsYourGenderIdentity.other}
                            // subText={Strings.whatIsYourGenderIdentity.otherSub}
                            checked={checked === 98}
                            onPress={() => {
                                setChecked(98);
                                setGender('OT');
                            }}
                            editable={!isLoading}
                        />
                        <Input
                            placeholder={Strings.whatIsYourGenderIdentity.otherSub}
                            onChangeText={newValue => setGenderOther(newValue)}
                            returnKeyType="next"
                            style={[
                                (checked === 98 ? { display: 'flex' } : { display: 'none' }),
                            ]}
                            placeholderTextColor="#C3C3C3"
                            editable={!isLoading}
                        />
                        <MultipleChoiceAnswer
                            text={Strings.whatIsYourGenderIdentity.declineToAnswer}
                            checked={checked === 99}
                            onPress={() => {
                                setChecked(99);
                                setGender(null);
                            }}
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
                        <PaginationDots currentPage={4} totalPages={7} />
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
