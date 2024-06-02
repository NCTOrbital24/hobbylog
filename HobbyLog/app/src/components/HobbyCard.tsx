import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { Hobby } from "../functions/HobbyConstructor";

export default function HobbyCard({ hobby }: { hobby: Hobby }) {
    return (
        <View style={styles.wrapper}>
            <View style={image.icon}>
                <Image style={image.dp} source={{ uri: hobby.icon }} />
            </View>

            <View style={styles.body}>
                <View style={progressBar.container}>
                    <View
                        style={[
                            progressBar.progress,
                            {
                                width: `${
                                    (hobby.tasksCompleted / hobby.totalTasks) *
                                    100
                                }%`,
                            },
                        ]}
                    ></View>
                </View>
                <Text style={progressBar.text}>
                    {hobby.tasksCompleted} out of {hobby.totalTasks}
                </Text>

                <Text style={styles.nameText}>{hobby.name}</Text>
                <Text style={styles.bodyText}>{hobby.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#FFF8DC",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "5%",
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: "center",
    },
    body: {
        width: "auto",
        height: "auto",
        flex: 0.9,
        marginLeft: 10,
    },
    bodyText: {
        fontSize: 14,
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

const progressBar = StyleSheet.create({
    container: {
        backgroundColor: "#FFC0CB",
        height: 10,
        width: "90%",
        marginBottom: 2,
        marginTop: 3,
        borderRadius: 3,
    },
    progress: {
        backgroundColor: "#673147",
        height: 10,
        borderRadius: 3,
    },
    text: {
        fontSize: 14,
    },
});

const image = StyleSheet.create({
    icon: {
        flex: 0.1,
        minWidth: 40,
        aspectRatio: 1,
        height: "auto",
        marginLeft: 15,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    dp: {
        height: 80,
        width: 80,
        borderRadius: 40,
        resizeMode: "contain",
    },
});
