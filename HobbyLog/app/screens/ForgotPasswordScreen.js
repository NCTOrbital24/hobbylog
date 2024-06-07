import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ForgotPasswordScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Coming Soon!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 50,
    }
});
