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
import { backendLink } from "@/constants/constants";
import RainbowProgressBar from "@/components/RainbowProgressBar";

export default function HomeScreen() {
    const levelUpExp = (level: number) => 100 * level;
    const [username, setUsername] = useState(null);
    const storedUsername = SecureStore.getItem("username");
    const [hobbies, setHobbies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [focus, toggleFocus] = useState(false);
    const [level, setLevel] = useState<number>(1);
    const [exp, setExp] = useState<number>(0);
    //rabz kebabz solution to ensure that the username displayed on the Home Screen is accurate.
    //tried using setEffect but caused username not to update on logout.
    if (storedUsername !== username) {
        setUsername(storedUsername);
    }

    const runFetchLevel = async () => {
        try {
            const userId = await SecureStore.getItem("id");
            const getLink = backendLink + "/api/user/" + userId + "/level";
            const response = await fetch(getLink, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const userLevel = await response.json();

            setLevel(userLevel.level);
            setExp(userLevel.exp);
        } catch (err) {
            console.error("Error fetching level", err);
        }
    };

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
            runFetchLevel();
            runFetchHobbies(); // Fetch hobbies whenever the screen gains focus
        }, [])
    );

    const renderHobbyCard = ({ item }) => <HobbyCard hobby={item} />;

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
                <Text style={styles.headerText}>Welcome Home, {username}!</Text>
            </View>
            <View style={styles.level}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 3,
                    }}
                >
                    <Text style={[styles.levelText, { fontWeight: "bold" }]}>
                        {level}
                    </Text>
                    <Text style={[styles.levelText, { fontWeight: "bold" }]}>
                        {`${exp} / ${levelUpExp(level)}`}
                    </Text>
                    <Text style={[styles.levelText, { fontWeight: "bold" }]}>
                        {level + 1}
                    </Text>
                </View>
                <RainbowProgressBar progress={exp / levelUpExp(level)} />
                <View
                    style={{
                        marginVertical: 5,
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
                    }}
                ></View>
            </View>
            {hobbies.length === 0 ? (
                <View style={[styles.root, {alignItems: "center"}]} >
                    <Text> No Hobbies. Click on create to get started!</Text>
                </View>
            ) : (
                <View style={styles.root}>
                    <FlatList
                        data={hobbies}
                        renderItem={renderHobbyCard}
                        keyExtractor={(item) => item._id}
                    />
                </View>
            )}
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
        height: "90%",
        paddingBottom: 200,
        paddingHorizontal: "7%",
    },
    header: {
        width: "100%",
        height: "10%",
        marginTop: 120,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
    },
    level: {
        width: "80%",
    },
    levelText: {},
    icon: {
        height: "50%",
        width: "50%",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        elevation: 5,
        marginTop: 10,
    },
    headerIcon: {
        height: 15,
        width: 15,
    },
});
