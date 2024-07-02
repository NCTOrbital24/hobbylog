import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import CallLogin from "../functions/CallLogin";
import PushNotification from 'react-native-push-notification';
import AddGoal from '../components/HobbyCard/AddGoal';

export default function Index() {
    const [route, setRoute] = useState(
        <SafeAreaView style={styles.root}>
            <Text>Loading...</Text>
        </SafeAreaView>
    );

    const goLogin = () => setRoute(<Redirect href="/screens/LoginScreen" />);
    const goRegister = () => setRoute(<Redirect href="/(tabs)/HomeScreen" />);

    useEffect(() => {
        async function checkLogin() {
            if (await SecureStore.getItemAsync("password")) {
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
                setRoute(<Redirect href="/screens/LoginScreen" />);
            }
        }
        checkLogin();

        PushNotification.configure({
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
            },
        });
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
