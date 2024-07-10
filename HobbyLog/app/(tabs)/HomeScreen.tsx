import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ImageBackground,
} from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Background from "@/assets/images/defaultBackground.png";
import HobbyCard from "@/components/HobbyCard/HobbyCard";
import { useFocusEffect } from "expo-router";
import fetchHobbies from "@/functions/FetchHobbies";


export default function HomeScreen() {
    const [username, setUsername] = useState(null);
    const storedUsername = SecureStore.getItem("username");
    const [hobbies, setHobbies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [focus, toggleFocus] = useState(false);
    //rabz kebabz solution to ensure that the username displayed on the Home Screen is accurate.
    //tried using setEffect but caused username not to update on logout.
    if (storedUsername !== username) {
        setUsername(storedUsername);
    }

    const runFetchHobbies = async () => {
        try {
            const userId = await SecureStore.getItem("id");
            await fetchHobbies(setHobbies, userId);
        } catch (error) {
            console.error("Error fetching hobbies:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getStoredUsername = async () => {
            const storedUsername = await SecureStore.getItemAsync("username");
            setUsername(storedUsername);
        };

        getStoredUsername();
        runFetchHobbies(); 
    }, []);

    useFocusEffect(
        useCallback(() => {
            runFetchHobbies(); // Fetch hobbies whenever the screen gains focus
        }, [])
    );

    const renderHobbyCard = ({ item }) => <HobbyCard hobby={item} />;
    
    
    if (hobbies.length === 0) {
        return (
            <View
                style={{
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text> No Hobbies. Click on create to make some!</Text>
            </View>
        );
    } else {
        return loading ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text> Loading...</Text>
            </View>
        ) : error ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>Error! {error}</Text>
            </View>
        ) : (
            <ImageBackground source={Background} style={styles.background}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        Welcome Home, {username}!
                    </Text>
                </View>
                <View style={styles.root}>
                    <FlatList
                        data={hobbies}
                        renderItem={renderHobbyCard}
                        keyExtractor={(item) => item._id}
                    />
                </View>
            </ImageBackground>
        );
    }
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
        paddingBottom: 200,
        paddingHorizontal: "7%",
    },
    header: {
        width: "100%",
        height: "10%",
        marginTop: 120,
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
        fontSize: 24,
        fontWeight: "bold",
        elevation: 5,
    },
    headerIcon: {
        height: 15,
        width: 15,
    },
});
