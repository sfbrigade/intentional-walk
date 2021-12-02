/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { Button, MultipleChoiceQuestion, MultipleChoiceAnswer, PaginationDots } from '../../components';
import { GlobalStyles } from '../../styles';
import { Strings } from '../../lib';

export default function WhatIsRaceScreen({ navigation }) {
    const [getChecked, setChecked] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const onNextPress = () => {
        navigation.navigate('WhatIsGenderIdentity');
    };

    const isValid = () => {
        return !isLoading && getChecked > 0;
    };

    // Replace when model is updated
    const options = [
        { id: 1, label: Strings.whatIsYourRace.americanNative },
        { id: 2, label: Strings.whatIsYourRace.asian },
        { id: 3, label: Strings.whatIsYourRace.black },
        { id: 4, label: Strings.whatIsYourRace.pacificIsl },
        { id: 5, label: Strings.whatIsYourRace.white }
    ];

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
                                checked={getChecked === o.id}
                                onPress={() => setChecked(o.id)}
                                editable={!isLoading}
                            />
                        )}
                        <MultipleChoiceAnswer
                            text={Strings.whatIsYourRace.other}
                            checked={getChecked === 98}
                            onPress={() => setChecked(98)}
                            editable={!isLoading}
                        />
                        <MultipleChoiceAnswer
                            text={Strings.whatIsYourRace.declineToAnswer}
                            checked={getChecked === 99}
                            onPress={() => setChecked(99)}
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
});
