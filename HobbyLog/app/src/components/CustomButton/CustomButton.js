import React from "react";
import { Pressable, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function CustomButton({
    onPress,
    text,
    type = "PRIMARY",
    bgColor,
    fgColor,
}) {
    return (
        <Pressable
            style={[
                styles.container,
                styles[`container_${type}`],
                bgColor ? { backgroundColor: bgColor } : {},
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.text,
                    styles[`text_${type}`],
                    fgColor ? { color: fgColor } : {},
                ]}
            >
                {text}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        marginVertical: 5,
        alignItems: "center",
    },
    container_PRIMARY: {
        backgroundColor: "#c3b1e1",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 5,
    },
    container_SECONDARY: {
        borderColor: '#3B71F3',
        borderWidth: 2,
    },
    container_TERTIARY: {},
    text: {
        color: "white",
        fontWeight: "bold",
    },
    text_TERTIARY: {
        color: "black",
    },
    text_SECONDARY: {
        color: 'blue'
    },
});
