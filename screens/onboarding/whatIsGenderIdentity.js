/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { Button, Input, MultipleChoiceQuestion, MultipleChoiceAnswer, PaginationDots } from '../../components';
import { GlobalStyles, Colors } from '../../styles';
import { Api, Realm, Strings } from '../../lib';

export default function WhatIsGenderIdentityScreen({ navigation, route }) {
    const user = route.params.user;
    const [checked, setChecked] = useState(0);
    const [gender, setGender] = useState(null);
    const [genderOther, setGenderOther] = useState('');
    const [isLoading, setLoading] = useState(false);

    const onNextPress = () => {
        // TODO: add validation for the "other" text input
        user.gender = gender;
        if (genderOther.trim().length > 0 && gender === 'OT') {
            user.gender_other = genderOther.trim();
        } else {
            user.gender_other = null;
        }

        Realm.open()
            .then(realm => {
                return Api.appUser.create(
                    user.name,
                    user.email,
                    user.zip,
                    user.age,
                    user.accountId,
                    user.gender,
                    user.gender_other,
                    user.race,
                    user.race_other,
                    user.is_latino,
                );
            })
            .then(response => {
                return Realm.createUser(
                    response.data.payload.account_id,
                    user.name,
                    user.email,
                    user.zip,
                    user.age,
                    user.gender,
                    user.gender_other,
                    user.race,
                    user.race_other,
                    user.is_latino,
                )
            })
            .then(res => {
                setLoading(false);
                // console.log(res);
                navigation.navigate('Info');
            })
            .catch(error => {
                // console.log(error);
                setLoading(false);
                // setAlertTitle(Strings.common.serverErrorTitle);
                // setAlertMessage(Strings.common.serverErrorMessage);
                // setShowAlert(true);
            });
    };

    const isValid = () => {
        return !isLoading && checked > 0;
    };

    // Replace when model is updated
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
                            subText={Strings.whatIsYourGenderIdentity.otherSub}
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
                                styles.input,
                            ]}
                            placeholderTextColor={'#C3C3C3'}
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
                        <PaginationDots currentPage={4} totalPages={6} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: {
        ...GlobalStyles.content,
        alignItems: 'center',
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
