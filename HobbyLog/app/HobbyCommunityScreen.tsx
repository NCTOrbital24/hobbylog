import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { backendLink } from "@/constants/constants";
import { Hobby } from "@/functions/HobbyConstructor";

export default function HobbyCommunityScreen() {
    const router = useRouter();
    const { hobbyId } = useLocalSearchParams();
    const [hobby, setHobby] = useState<Hobby | null>(null);

    const hobbyPageLink = backendLink; //TODO: FILL THIS IN

    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>THIS IS A PAGE FOR A HOBBY</Text>
        </View>
    );
}
