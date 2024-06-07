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
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Background from "@/assets/images/defaultBackground.png";
import HobbyCard from "@/components/HobbyCard/HobbyCard";
import CustomClickableImage from "@/components/CustomClickableImage/CustomClickableImage";

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
    const sampleHobby = HobbyConstructor(
        "0",
        "Crochet",
        "learning to crochet!",
        7,
        1,
        "https://t3.ftcdn.net/jpg/03/70/68/64/360_F_370686420_oFg3nbFQhYQ4UtLG6DAc7zkAWzd5QSR4.jpg"
    );
    const sampleHobby1 = HobbyConstructor(
        "1",
        "Skibidi Toilet",
        "only in ohio",
        9,
        7,
        "https://static.thenounproject.com/png/2288572-200.png"
    );
    const sampleHobby2 = HobbyConstructor(
        "2",
        "Rizzology",
        "sticking out your...",
        2,
        2,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjCgkqR1nS97-EGV6-fq4AtAudMu-7TuheOg&s"
    );
    return (
        <ImageBackground source={Background} style={styles.background}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome Home, {username}!</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.root}
            >
                <HobbyCard hobby={sampleHobby} />
                <HobbyCard hobby={sampleHobby1} />
                <HobbyCard hobby={sampleHobby2} />
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
