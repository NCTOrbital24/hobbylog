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
        width: "50%",
        padding: 10,
        marginVertical: 5,
        alignItems: "center",
        alignSelf: "center",
    },
    container_PRIMARY: {
        backgroundColor: "#c3b1e1",
        borderRadius: 5,
    },
    container_TERTIARY: {
        width: "100%",
        marginVertical: 2,
        padding: 5,
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
    text_TERTIARY: {
        color: "black",
        fontSize: 14,
    },
    text_SECONDARY: {
        color: 'blue'
    },
});
