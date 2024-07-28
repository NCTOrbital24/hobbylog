import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function UserSearchCard({
    userInfo,
    hideTick = false,
}: {
    userInfo: {
        _id: string;
        name: string;
        icon: string;
        isFriend: boolean;
    };
    hideTick: boolean;
}) {
    const router = useRouter();

    const { _id, name, icon, isFriend } = userInfo;

    return (
        <View style={styles.card}>
            <TouchableOpacity
                onPress={() =>
                    router.push({
                        pathname: "UserCommunityScreen",
                        params: { userId: _id },
                    })
                }
                style={{ flexDirection: "row" }}
            >
                <View style={styles.icon}>
                    <Image source={{ uri: icon }} style={styles.icon} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoText}>{name}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => addAsFriend()}
                style={styles.check}
            >
                {hideTick ? (
                    <View></View>
                ) : isFriend ? (
                    <Ionicons name="checkmark" size={24} color="black" />
                ) : (
                    <AntDesign name="pluscircleo" size={24} color="black" />
                )}
            </TouchableOpacity>
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
