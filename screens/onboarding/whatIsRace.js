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
import { Strings } from '../../lib';

export default function WhatIsRaceScreen({ navigation }) {
    const [getChecked, setChecked] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const onNextPress = () => {
        navigation.navigate('WhatIsGenderIdentity');
    };

    const isValid = () => {
        return !isLoading && getChecked.length > 0;
    };

    // Replace when model is updated
    const options = [
        { id: 1, label: Strings.whatIsYourRace.americanNative },
        { id: 2, label: Strings.whatIsYourRace.asian },
        { id: 3, label: Strings.whatIsYourRace.black },
        { id: 4, label: Strings.whatIsYourRace.pacificIsl },
        { id: 5, label: Strings.whatIsYourRace.white },
    ];

    const pressCheck = (id) => {
        let whatsChecked = getChecked;
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
                                text={o.label}
                                checked={getChecked.indexOf(o.id) >= 0}
                                onPress={() => pressCheck(o.id)}
                                editable={!isLoading}
                            />
                        )}
                        <MultipleChoiceAnswer
                            text={Strings.whatIsYourRace.other}
                            subText={Strings.whatIsYourRace.otherSub}
                            checked={getChecked.indexOf(98) >= 0}
                            onPress={() => pressCheck(98)}
                            editable={!isLoading}
                        />
                        <Input
                            placeholder={Strings.whatIsYourRace.otherSub}
                            // onChangeText={}
                            returnKeyType="next"
                            style={[
                                (getChecked.indexOf(98) >= 0 ? { display: 'flex' } : { display: 'none' }),
                                styles.input,
                            ]}
                            placeholderTextColor={'#C3C3C3'}
                            editable={!isLoading}
                        />
                        <MultipleChoiceAnswer
                            text={Strings.whatIsYourRace.declineToAnswer}
                            checked={getChecked.indexOf(99) >= 0}
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
                        <PaginationDots currentPage={2} totalPages={3} />
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
