import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { backendLink } from "@/constants/constants";
import { Hobby } from "@/functions/HobbyConstructor";

export default function UserCommunityScreen() {
    const router = useRouter();
    const { userId } = useLocalSearchParams();
    const [user, setUser] = useState(null);

    const userPageLink = backendLink; //TODO: FILL THIS IN

    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>THIS IS A PAGE FOR A USER</Text>
        </View>
    );
}
