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
    /*
    const [route, setRoute] = useState(
        <SafeAreaView style={styles.root}>
            <Text>Loading...</Text>
        </SafeAreaView>
    );
    const goLogin = () => setRoute(
        <Redirect href="/src/screens/LoginScreen/LoginScreen" />
    );
    const goRegister = () => setRoute(
        <Redirect href="/src/screens/HomeScreen/HomeScreen" />
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
                    goRegister();
                } else {
                    goLogin();
                }
            } else {
                setRoute(
                    <Redirect href="/src/screens/LoginScreen/LoginScreen" />
                );
            }
        }
        checkLogin();
    }, []);
    return route;
    */
    return (
        <StrictMode>
            <Redirect href="/screens/LoginScreen" />
        </StrictMode>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#ffd1dc",
        alignItems: "center",
        justifyContent: "center",
    },
});
