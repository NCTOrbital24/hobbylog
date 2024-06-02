import React from 'react';
import { View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';

export default function CustomInput({value, setValue, placeholder, isSecure}) {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={isSecure}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9faeb',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
    },
});
