import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Image,
    Modal,
} from "react-native";
import AddGoalModal from "@/components/HobbyCreation/AddGoalModal";
import AddTaskModal from "@/components/HobbyCreation/AddTaskModal";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { Hobby, EMPTY_HOBBY } from "@/functions/HobbyConstructor";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import sortGoalsByDeadline from "@/functions/sortGoalsByDeadline";

import { backendLink } from "@/constants/constants";

export default function HobbyCommunityScreen() {
    const router = useRouter();
    const { hobbyId } = useLocalSearchParams();

    const updateLink = backendLink + "/api/hobby/" + hobbyId + "/update";
    const retrieveLink = backendLink + "/api/hobby/" + hobbyId + "/get";
    const deleteLink = backendLink + "/api/hobby/" + hobbyId + "/remove";

    const [hobby, setHobby] = useState<Hobby>(EMPTY_HOBBY);

    const getHobby = async () => {
        try {
            const response = await fetch(retrieveLink, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to retrieve hobby");
            }

            function parseSingleHobby(hobby: Hobby): Hobby {
                return {
                    ...hobby,
                    goals: hobby.goals.map((goal) => ({
                        ...goal,
                        deadline: new Date(goal.deadline),
                    })),
                };
            }

            const hobbyData = await response.json();
            const updatedHobbyData = parseSingleHobby(hobbyData);
            setHobby(updatedHobbyData);
        } catch (err) {
            console.error("Error fetching hobby", err);
        }
    };

    const goBack = () => {
        router.back();
    };

    const addHobbyToProfile = () => {
        //TODO
    };

    useFocusEffect(
        useCallback(() => {
            getHobby();
        }, [])
    );

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack()}>
                    <AntDesign name="back" size={24} color="#e8e8e8" />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    {hobby ? (
                        <Text style={styles.headerText}>{hobby.name}</Text>
                    ) : (
                        <Text>Error rendering hobby</Text>
                    )}
                </View>
                <TouchableOpacity
                    onPress={() => {
                        addHobbyToProfile();
                    }}
                >
                    <FontAwesome6 name="add" size={24} color="#e8e8e8" />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                {/* NINETT YOUR IMAGE PICKER GOES HERE */}
                <Image
                    source={{ uri: hobby.icon }}
                    style={{
                        height: 100,
                        width: 100,
                        backgroundColor: "black",
                        borderRadius: 50,
                        resizeMode: "cover",
                    }}
                />
                <Text>Edit Hobby Image</Text>
                <Text style={styles.inputSet}>{hobby.name}</Text>
                <Text style={styles.inputSet}>{hobby.description}</Text>
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
                    {hobby.goals.length > 0 ? (
                        <FlatList
                            style={styles.list}
                            data={hobby.goals}
                            renderItem={({ item, index }) => (
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
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    ) : (
                        <Text style={{ color: "grey", marginBottom: 5 }}>
                            This hobby has no goals.
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
                    {hobby.tasks.length > 0 ? (
                        <FlatList
                            style={styles.list}
                            data={hobby.tasks}
                            renderItem={({ item, index }) => (
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
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    ) : (
                        <Text style={{ color: "grey", marginBottom: 5 }}>
                            This hobby has no tasks.
                        </Text>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: "100%",
        width: "100%",
        backgroundColor: "#F2D2BD",
        alignItems: "center",
    },
    header: {
        width: "100%",
        height: "7%",
        backgroundColor: "#9F2B68",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: "4%",
        position: "relative",
    },
    titleContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontSize: 20,
        color: "white",
    },
    editButton: {
        fontSize: 16,
        color: "white",
    },
    body: {
        height: "100%",
        width: "90%",
        alignItems: "center",
        paddingTop: 20,
    },
    input: {
        textAlign: "center",
        paddingVertical: 0,
    },
    inputSet: {
        paddingVertical: 5,
    },
    goalButton: {
        marginTop: 8,
        marginBottom: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    list: {},
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
    submitButton: {
        marginTop: 10,
        paddingVertical: 13,
        paddingHorizontal: 18,
        borderRadius: 8,
        backgroundColor: "#F9BEE7",
    },
    submitText: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
    },
    saveButton: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        padding: 9,
        elevation: 4,
        borderRadius: 12,
        marginBottom: 8,
        marginTop: 3,
        backgroundColor: "pink",
    },
    deleteButton: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        padding: 9,
        elevation: 4,
        borderRadius: 12,
        marginBottom: 5,
        backgroundColor: "#AA336A",
    },
    saveText: {
        fontSize: 15,
        fontWeight: "bold",
    },
    modalContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    deleteModal: {
        marginHorizontal: "5%",
        borderRadius: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 10,
        elevation: 5,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    deleteModalText: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
    },
    deleteModalButton: {
        backgroundColor: "red",
        width: "40%",
        paddingHorizontal: 15,
        paddingVertical: 7,
        marginTop: 15,
        borderRadius: 20,
        alignItems: "center",
    },
    deleteModalButtonTransparent: {
        backgroundColor: "grey",
        width: "40%",
        paddingHorizontal: 15,
        paddingVertical: 7,
        marginTop: 15,
        borderRadius: 20,
        alignItems: "center",
    },
    deleteModalButtonText: {
        fontSize: 22,
        fontWeight: "bold",
    },
});
