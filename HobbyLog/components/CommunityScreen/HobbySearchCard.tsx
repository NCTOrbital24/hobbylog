import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

//! THIS CARD IS NOT SUPPOSED TO TAKE A HOBBY, BUT INSTEAD AN OBJECT

export default function HobbySearchCard({
    hobbyInfo,
}: {
    hobbyInfo: {
        _id: string;
        name: string;
        description: string;
        icon: string;
        owner: string;
        goalsLength: number;
        tasksLength: number;
    };
}) {

    const router = useRouter();
    const { _id, name, icon, description, owner, goalsLength, tasksLength } =
        hobbyInfo;

    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: "HobbyCommunityScreen",
                    params: { hobbyId: _id },
                })
            }
        >
            <View style={styles.card}>
                <View style={styles.icon}>
                    {/* TODO: IMAGE STUFF GOES HERE */}
                </View>
                <View style={styles.info}>
                    <View style={styles.goalText}>
                        <Text style={styles.smallText}>goals: </Text>
                        <Text style={styles.bigText}>{goalsLength}</Text>
                    </View>
                    <View style={styles.taskText}>
                        <Text style={styles.smallText}>tasks: </Text>
                        <Text style={styles.bigText}>{tasksLength}</Text>
                    </View>
                </View>
                <View style={styles.verticalLine}>
                    </View>
                <View style={styles.body}>
                    <Text numberOfLines={1} style={styles.name}>
                        {name}
                    </Text>
                    <Text numberOfLines={1} style={styles.description}>
                        {description}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text>Created by: </Text>
                        <Text>{owner}</Text>
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
        backgroundColor: "#ffd1dc",
        borderRadius: 37,
        elevation: 2,
    },
    icon: {
        backgroundColor: "yellow",
        width: 60,
        height: 60,
        borderRadius: 30,
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
