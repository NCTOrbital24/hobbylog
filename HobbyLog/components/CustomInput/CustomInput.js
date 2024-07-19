import React from 'react';
import { View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';

export default function CustomInput({value, setValue, placeholder, isSecure, maxLength}) {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={isSecure}
                maxLength = {maxLength}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9faeb',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginBottom: 7,
    },
    input: {
        fontSize: 16,
    },
});
