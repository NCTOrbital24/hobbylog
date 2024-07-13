import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Image,
} from "react-native";
import { router, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Background from "@/assets/images/defaultBackground.png";

export default function HobbyScreen() {
    return (
        <TouchableOpacity
            onPress={() => {
                SecureStore.deleteItemAsync("email");
                SecureStore.deleteItemAsync("password");
                //ping server for username and get it
                SecureStore.deleteItemAsync("username");
                SecureStore.deleteItemAsync("id");
                router.replace("../screens/LoginScreen");
            }}
            style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>Coming Soon!</Text>
        </TouchableOpacity>
    );
}
