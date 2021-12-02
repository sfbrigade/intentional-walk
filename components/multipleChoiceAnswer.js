/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, GlobalStyles } from '../styles';
import { CheckBox } from 'react-native-elements';

export default function MultipleChoiceAnswer(props) {
    return (
        <TouchableOpacity
            style={[styles.row, props.style]}
            pointerEvents={props.editable ? 'auto' : 'none'}
            onPress={() => props.onPress()}
        >
            <CheckBox
                checked={props.checked}
                iconType="material"
                uncheckedIcon="check-box-outline-blank"
                checkedIcon="check-box"
                size={32}
                uncheckedColor={props.editable ? Colors.primary.purple : Colors.primary.gray2}
                checkedColor={props.editable ? Colors.primary.purple : Colors.primary.gray2}
                containerStyle={styles.container}
                onPress={() => props.onPress()}
            />
            <Text
                style={styles.text}
            >{props.text}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        margin: 0,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 62,
        width: '100%',
        marginTop: 0,
        marginBottom: 2,
        paddingLeft: 14,
        borderRadius: GlobalStyles.rounded.borderRadius,
        backgroundColor: 'white',
        shadowColor: GlobalStyles.boxShadow.shadowColor,
        shadowOffset: GlobalStyles.boxShadow.shadowOffset,
        shadowOpacity: GlobalStyles.boxShadow.shadowOpacity,
        shadowRadius: GlobalStyles.boxShadow.shadowRadius,
        elevation: GlobalStyles.boxShadow.elevation,
    },
    text: {
        fontFamily: 'Roboto',
        fontWeight: '700',
        fontSize: 18,
        color: Colors.primary.purple,
        paddingLeft: 16,
    },
});
