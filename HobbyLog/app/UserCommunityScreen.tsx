import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { backendLink } from "@/constants/constants";
import { Hobby } from "@/functions/HobbyConstructor";
import { fetchProfile } from "@/functions/apiUser";

export default function UserCommunityScreen() {
    const router = useRouter();
    const { userId } = useLocalSearchParams();
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState({
        username: "",
        userId: userId,
        hobbies: [],
        bio: "",
        profileImage:
            "https://6.soompi.io/wp-content/uploads/image/a7d15834c0204c7f9d0f04b0b5302acf/dummy.jpeg?s=900x600&e=t",
    });

    const getProfile = async () => {
        try {
            const result = await fetchProfile(userId);
            setProfile(result);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getProfile();
        }, [])
    );

    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>THIS IS A PAGE FOR A USER</Text>
        </View>
    );
}
