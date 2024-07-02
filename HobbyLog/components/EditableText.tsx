import React from "react";
import { View, TextInput, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function EditableText({
    value,
    setValue,
    editable,
    styles,
}: {
    value: any;
    setValue: any;
    editable: boolean;
    styles: any;
}) {
    return (
        <View>
            {editable ? <TextInput value={value}
                onChangeText={setValue}
                placeholder={value}
                style={styles}
            /> : <Text style={styles}>{value}</Text>}
        </View>
    );
}