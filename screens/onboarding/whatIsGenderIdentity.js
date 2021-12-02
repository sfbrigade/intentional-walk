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

export default function WhatIsGenderIdentityScreen({ navigation }) {
    const [getChecked, setChecked] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const onNextPress = () => {
        navigation.navigate('Info');
    };

    const isValid = () => {
        return !isLoading && getChecked > 0;
    };

    // Replace when model is updated
    const options = [
        { id: 1, label: Strings.whatIsYourGenderIdentity.female },
        { id: 2, label: Strings.whatIsYourGenderIdentity.male },
        { id: 3, label: Strings.whatIsYourGenderIdentity.transFemale },
        { id: 4, label: Strings.whatIsYourGenderIdentity.transMale },
        { id: 5, label: Strings.whatIsYourGenderIdentity.nonBinary }
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
                                text={o.label}
                                checked={getChecked === o.id}
                                onPress={() => setChecked(o.id)}
                                editable={!isLoading}
                            />
                        )}
                        <MultipleChoiceAnswer
                            text={Strings.whatIsYourGenderIdentity.other}
                            checked={getChecked === 98}
                            onPress={() => setChecked(98)}
                            editable={!isLoading}
                        />
                        <MultipleChoiceAnswer
                            text={Strings.whatIsYourGenderIdentity.declineToAnswer}
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
