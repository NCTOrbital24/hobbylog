import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import { backendLink } from "../constants/constants";
import * as SecureStore from "expo-secure-store";
import { Redirect } from "expo-router";
import CallLogin from "../functions/CallLogin";
import { StrictMode } from "react";

export default function Index() {
    const [route, setRoute] = useState(
        <SafeAreaView style={styles.root}>
            <Text>Loading...</Text>
        </SafeAreaView>
    );
    const goLogin = () => setRoute(
        <Redirect href="/screens/LoginScreen" />
    );
    const goHome = () => setRoute(
        <Redirect href="/(tabs)/HomeScreen" />
    );
    useEffect(() => {
        async function checkLogin() {
            if (SecureStore.getItem("password")) {
                const email = await SecureStore.getItemAsync("email");
                const password = await SecureStore.getItemAsync("password");
                const response = await CallLogin(email, password);
                if (response == undefined) {
                    goLogin();
                } else if (response.status === 200) {
                    goHome();
                } else {
                    goLogin();
                }
            } else {
                setRoute(
                    <Redirect href="/screens/LoginScreen" />
                );
            }
        }
        checkLogin();
    }, []);
    return route;
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#ffd1dc",
        alignItems: "center",
        justifyContent: "center",
    },
});
