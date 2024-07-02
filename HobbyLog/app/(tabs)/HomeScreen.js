import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ImageBackground,
} from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Background from "@/assets/images/defaultBackground.png";
import HobbyCard from "@/components/HobbyCard/HobbyCard";

//should hobby come from backend?
import HobbyConstructor from "@/functions/HobbyConstructor";

export default function HomeScreen() {
    const [username, setUsername] = useState(null);
    const storedUsername = SecureStore.getItem("username");
    //rabz kebabz solution to ensure that the username displayed on the Home Screen is accurate.
    //tried using setEffect but caused username not to update on logout.
    if (storedUsername !== username) {
        setUsername(storedUsername);
    }
    return (
        <ImageBackground source={Background} style={styles.background}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome Home, {username}!</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.root}
            >
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    root: {
        width: "100%",
        height: "100%",
        padding: "7%",
    },
    header: {
        width: "100%",
        height: "10%",
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
    },
    icon: {
        height: "50%",
        width: "50%",
    },
    headerText: {
        fontSize: 36,
    },
    headerIcon: {
        height: 15,
        width: 15,
    },
});
