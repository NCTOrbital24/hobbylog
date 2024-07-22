import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function UserSearchCard({ info }) {
    const router = useRouter();
    const userId = "ho"; //! REPLACE WITH ACTUAL USERID. THIS IS A PLACEHOLDER.

    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: "UserCommunityScreen",
                    params: { userId: userId },
                })
            }
        >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text>This is a card for a user search result!</Text>
            </View>
        </TouchableOpacity>
    );
}
