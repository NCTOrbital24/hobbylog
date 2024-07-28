import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function HobbySearchCard({ info }) {
    const router = useRouter();
    const hobbyId = "hey"; //! REPLACE WITH ACTUAL HOBBYID. THIS IS A PLACEHOLDER

    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: "HobbyCommunityScreen",
                    params: { hobbyId: hobbyId },
                })
            }
        >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text>This is a card for a hobby search result!</Text>
            </View>
        </TouchableOpacity>
    );
}
