import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

//! THIS CARD IS NOT SUPPOSED TO TAKE A HOBBY, BUT INSTEAD AN OBJECT

export default function HobbySearchCard(
    {
        hobbyInfo,
        color = "",
        key = "",
    }: {
        hobbyInfo: {
            _id: string;
            name: string;
            description: string;
            icon: string | null;
            user: string;
            goals: number;
            tasks: number;
            };
            color?: string;
            key: string;
    },
) {
    const router = useRouter();
    const { _id, name, icon, description, user, goals, tasks } = hobbyInfo;

    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: "HobbyCommunityScreen",
                    params: { hobbyId: _id },
                })
            }
        >
            <View style={[color === "" ? { backgroundColor: "#ffd1dc" } : { backgroundColor: color }, styles.card]}>
                <View style={styles.icon}>
                    <Image
                        source={{
                            uri: icon
                                ? icon
                                : "https://images.squarespace-cdn.com/content/v1/5c6e2dad94d71a1ea569fca0/1624344400741-2VUMN1MRI6UD50VFLYXG/Painting",
                        }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.info}>
                    <View style={styles.goalText}>
                        <Text style={styles.smallText}>goals: </Text>
                        <Text style={styles.bigText}>{goals}</Text>
                    </View>
                    <View style={styles.taskText}>
                        <Text style={styles.smallText}>tasks: </Text>
                        <Text style={styles.bigText}>{tasks}</Text>
                    </View>
                </View>
                <View style={styles.verticalLine}></View>
                <View style={styles.body}>
                    <Text numberOfLines={1} style={styles.name}>
                        {name}
                    </Text>
                    <Text numberOfLines={1} style={styles.description}>
                        {description}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text>Created by: </Text>
                        <Text>{user}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        alignSelf: "center",
        marginBottom: 8,
        padding: 7,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 37,
        elevation: 2,
    },
    icon: {
        backgroundColor: "pink",
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    info: {
        paddingLeft: 8,
        height: 60,
        justifyContent: "center",
    },
    goalText: {
        flexDirection: "row",
        alignItems: "center",
    },
    taskText: {
        flexDirection: "row",
        alignItems: "center",
    },
    bigText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    smallText: {
        width: 43,
    },
    verticalLine: {
        borderWidth: 1,
        height: 50,
        marginLeft: 8,
        borderColor: "rgba(0, 0, 0, 0.7)",
    },
    body: {
        paddingHorizontal: 8,
        maxWidth: "100%",
        width: "60%",
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 3,
    },
    description: {
        fontSize: 14,
        marginRight: 10,
    },
});
