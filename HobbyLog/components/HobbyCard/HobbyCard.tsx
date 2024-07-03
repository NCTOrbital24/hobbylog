import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { Hobby } from "../../functions/HobbyConstructor";

export default function HobbyCard({ hobby }: { hobby: Hobby }) {

    const navigateToGoal = (index) => { };
    const navigateToTask = (index) => { };

    const goals = hobby.goals;
    const tasks = hobby.tasks;

    return (
        <View style={styles.wrapper}>
            <View style={image.icon}>
                <Image style={image.dp} source={{ uri: hobby.icon }} />
            </View>

            <View style={styles.body}>
                <View style={progressBar.container}>
                    {hobby.goals.length !== 0 ? (
                        <View
                            style={[
                                progressBar.progress,
                                {
                                    width: `${
                                        (hobby.goalsCompleted /
                                            hobby.totalGoals) *
                                        100
                                    }%`,
                                },
                            ]}
                        ></View>
                    ) : (
                        <View></View>
                    )}
                </View>
                <Text style={progressBar.text}>
                    {hobby.goalsCompleted} out of {hobby.totalGoals}
                </Text>

                <Text style={styles.nameText}>{hobby.name}</Text>
                <Text style={styles.bodyText}>{hobby.description}</Text>

                <View style={styles.listContainer}>
                    <Text
                        style={{
                            fontSize: 15,
                            marginBottom: 4,
                            fontWeight: "bold",
                        }}
                    >
                        Goals:
                    </Text>
                    {goals.length > 0 ? (
                        <FlatList
                            style={styles.list}
                            data={goals}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => navigateToGoal(index)}
                                >
                                    <View style={styles.card}>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                marginBottom: 1,
                                            }}
                                        >
                                            •{" " + item.name}
                                        </Text>
                                        <Text>{item.description}</Text>
                                        <Text>
                                            Deadline:{" "}
                                            {item.deadline.toLocaleDateString()}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    ) : (
                        <Text style={{ color: "grey" }}>
                            No goals yet. Add a new goal!
                        </Text>
                    )}
                </View>

                <View style={styles.listContainer}>
                    <Text
                        style={{
                            fontSize: 15,
                            marginBottom: 4,
                            fontWeight: "bold",
                        }}
                    >
                        Tasks:
                    </Text>
                    {tasks.length > 0 ? (
                        <FlatList
                            style={styles.list}
                            data={tasks}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => navigateToTask(index)}
                                >
                                    <View
                                        style={{
                                            marginBottom: 10,
                                            padding: 10,
                                            backgroundColor: "#F2E6FF",
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                marginBottom: 5,
                                            }}
                                        >
                                            •{" " + item.name}
                                        </Text>
                                        <Text>{item.description}</Text>
                                        <Text>Frequency: {item.frequency}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    ) : (
                        <Text>No tasks yet. Add a new task!</Text>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        width: "100%",
        backgroundColor: "#fffdd0",
        paddingTop: 8,
        paddingLeft: 17,
        paddingRight: 15,
        paddingBottom: 5,
        borderRadius: 15,
        marginBottom: 8,
        maxHeight: "40%",
    },
    card: {
        backgroundColor: "#ffd1dc",
        color: "#141414",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginBottom: 7,
    },
    wrapper: {
        backgroundColor: "#FFF8DC",
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
