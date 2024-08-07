import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { backendLink } from "@/constants/constants";
import fetchImage from "@/functions/fetchImage";

export default function UserSearchCard({
    userInfo,
    hideTick = false,
}: {
    userInfo: {
        _id: string;
        username: string;
        profileImage: string;
        isFriend: boolean;
    };
    hideTick: boolean;
}) {
    const router = useRouter();

    const { _id, username, profileImage, isFriend } = userInfo;
    const [friendStatus, setFriendStatus] = useState(isFriend);

    const addAsFriend = async () => {
        try {
            const response = await fetch(
                `${backendLink}/api/friend/${_id}/add`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to add friend");
            }
            setFriendStatus(true);
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity
                onPress={() =>
                    router.push({
                        pathname: "UserCommunityScreen",
                        params: { userId: _id, isFriend: String(isFriend) },
                    })
                }
                style={{ flexDirection: "row" }}
            >
                <View style={styles.icon}>
                    <Image source={{ uri: profileImage ? fetchImage(profileImage) : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" }} style={styles.icon} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoText}>{username}</Text>
                </View>
            </TouchableOpacity>
            {hideTick ? (
                <View></View>
            ) : friendStatus ? (
                <View style={styles.check}>
                    <Ionicons name="checkmark" size={24} color="black" />
                </View>
            ) : (
                <TouchableOpacity
                    onPress={() => addAsFriend()}
                    style={styles.check}
                >
                    <AntDesign name="pluscircleo" size={24} color="black" />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        alignSelf: "center",
        marginBottom: 8,
        padding: 7,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffd1dc",
        borderRadius: 37,
        elevation: 2,
        width: "100%",
        justifyContent: "space-between",
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    info: {
        paddingLeft: 10,
        height: 60,
        justifyContent: "center",
    },
    infoText: {
        fontSize: 19,
        fontWeight: "bold",
    },
    check: {
        flexDirection: "row-reverse",
        paddingRight: 12,
    },
});
