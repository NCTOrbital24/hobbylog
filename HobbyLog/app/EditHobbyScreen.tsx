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
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import sortGoalsByDeadline from "@/functions/sortGoalsByDeadline";

import { backendLink } from "@/constants/constants";
import parseHobby from "@/functions/ParseHobby";

export default function EditHobbyPage() {
    const router = useRouter();
    const { hobbyId } = useLocalSearchParams();

    const updateLink = backendLink + "/api/hobby/" + hobbyId + "/update";
    const retrieveLink = backendLink + "/api/hobby/" + hobbyId + "/get";
    const deleteLink = backendLink + "/api/hobby/" + hobbyId + "/remove";

    const [hobby, setHobby] = useState<Hobby | null>(null);
    const [updatedHobby, setUpdatedHobby] = useState<Hobby>(EMPTY_HOBBY);
    const [editable, setEditable] = useState<boolean>(false);
    const [image, setImage] = useState(null);
    const [goalModalGoal, setGoalModalGoal] = useState();
    const [taskModalTask, setTaskModalTask] = useState();
    const [goalModal, showGoalModal] = useState(false);
    const [taskModal, showTaskModal] = useState(false);
    const [deleteModal, showDeleteModal] = useState(false);
    const [journalModalVisible, setJournalModalVisible] = useState(false);
    const [currentJournalEntry, setCurrentJournalEntry] = useState(null);
    const [journals, setJournals] = useState([]);
    const [newJournalText, setNewJournalText] = useState("");
    const navigateToGoal = (index) => {};
    const navigateToTask = (index) => {};

    const handleSavePressed = () => {
        updateHobby();
        router.back();
    };

    const handleDeletePressed = () => {
        deleteHobby();
    };

    const closeGoalModal = () => {
        setGoalModalGoal(undefined);
        showGoalModal(false);
    };
    const closeTaskModal = () => {
        setTaskModalTask(undefined);
        showTaskModal(false);
    };

    const navigateToAddGoal = (index) => {
        const selectedGoal = updatedHobby.goals[index];
        setGoalModalGoal(selectedGoal);
        showGoalModal(true);
    };

    const navigateToAddTask = (index) => {
        const selectedTask = updatedHobby.tasks[index];
        setTaskModalTask(selectedTask);
        showTaskModal(true);
    };

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
            setUpdatedHobby(updatedHobbyData);
            setImage(updatedHobbyData.profilePic);
        } catch (err) {
            console.error("Error fetching hobby", err);
        }
    };

    const pickImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert(
                "You need to allow access to your photos to change the image."
            );
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
            setUpdatedHobby((prev) => ({ ...prev, profilePic: result.uri }));
        }
    };

    const updateHobby = async () => {
        const newHobby = {
            ...updatedHobby,
            goals: sortGoalsByDeadline(updatedHobby.goals),
            profilePic: image,
        };
        setUpdatedHobby(newHobby);
        try {
            const response = await fetch(updateLink, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newHobby),
            });
            if (!response.ok) {
                throw new Error(
                    "Failed to update hobby, error code: " + response.status
                );
            }

            const updatedHobbyData = await response.json();
            setHobby(newHobby);
        } catch (err) {
            console.error("Error updating hobby:", err);
        }
    };

    const deleteHobby = async () => {
        try {
            const response = await fetch(deleteLink, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(
                    "Failed to delete hobby, code: " + response.status
                );
            }
        } catch (err) {
            console.error("Error deleting hobby:", err);
        }
        router.back();
    };

    const goBack = () => {
        router.back();
    };

    useFocusEffect(
        useCallback(() => {
            getHobby();
        }, [])
    );

    const addJournalEntry = () => {
        const newEntry = {
            id: new Date().getTime(),
            text: newJournalText,
            timestamp: new Date().toISOString(),
        };
        setJournals([newEntry, ...journals]); // Add new entry to the beginning of the array
        setNewJournalText("");
        setJournalModalVisible(false);
    };
    const closeJournalModal = () => {
        setJournalModalVisible(false);
        setCurrentJournalEntry(null);
        setNewJournalText("");
    };

    const updateJournalEntry = (entryId, newText) => {
        const updatedJournals = journals.map((entry) =>
            entry.id === entryId ? { ...entry, text: newText } : entry
        );
        setJournals(updatedJournals);
        closeJournalModal();
    };

    const deleteJournalEntry = (entryId) => {
        setJournals(journals.filter((entry) => entry.id !== entryId));
        setJournalModalVisible(false);
    };

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
                        setEditable(!editable);
                    }}
                >
                    <Text style={styles.editButton}>
                        {editable ? "Save" : "Edit"}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <TouchableOpacity
                    onPress={pickImage}
                    style={styles.imageContainer}
                >
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            style={styles.profilePic}
                        />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <Text>Tap to add an image</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {editable ? (
                    <TextInput
                        value={updatedHobby.name}
                        onChangeText={(newName) => {
                            setUpdatedHobby((prevHobby) => ({
                                ...prevHobby,
                                name: newName,
                            }));
                        }}
                        placeholder="Enter a name..."
                        style={styles.input}
                    />
                ) : (
                    <Text style={styles.inputSet}>{updatedHobby.name}</Text>
                )}
                {editable ? (
                    <TextInput
                        value={updatedHobby.description}
                        onChangeText={(newDesc) => {
                            setUpdatedHobby((prevHobby) => ({
                                ...prevHobby,
                                description: newDesc,
                            }));
                        }}
                        placeholder="Enter a description..."
                        style={styles.input}
                    />
                ) : (
                    <Text style={styles.inputSet}>
                        {updatedHobby.description}
                    </Text>
                )}

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
                    {updatedHobby.goals.length > 0 ? (
                        <FlatList
                            style={styles.list}
                            data={updatedHobby.goals}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (editable) {
                                            navigateToAddGoal(index);
                                        }
                                    }}
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
                        <Text style={styles.emptyJournalText}>
                            No goals yet. Add a new goal!
                        </Text>
                    )}
                    <TouchableOpacity
                        style={styles.goalButton}
                        onPress={() => {
                            setGoalModalGoal(undefined);
                            showGoalModal(true);
                        }}
                    >
                        <AntDesign name="pluscircle" size={20} color="black" />
                    </TouchableOpacity>
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
                    {updatedHobby.tasks.length > 0 ? (
                        <FlatList
                            style={styles.list}
                            data={updatedHobby.tasks}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (editable) navigateToAddTask(index);
                                    }}
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
                        <Text style={styles.emptyJournalText}>No tasks yet. Add a new task!</Text>
                    )}
                    <TouchableOpacity
                        style={styles.goalButton}
                        onPress={() => {
                            setTaskModalTask(undefined);
                            showTaskModal(true);
                        }}
                    >
                        <AntDesign name="pluscircle" size={20} color="black" />
                    </TouchableOpacity>
                    <AddGoalModal
                        visible={goalModal}
                        closeModal={closeGoalModal}
                        goal={goalModalGoal}
                        goals={updatedHobby.goals}
                        setGoals={(newGoals) => {
                            setUpdatedHobby((prevHobby) => ({
                                ...prevHobby,
                                goals: newGoals,
                            }));
                        }}
                    />
                    <AddTaskModal
                        visible={taskModal}
                        closeModal={closeTaskModal}
                        task={taskModalTask}
                        tasks={updatedHobby.tasks}
                        setTasks={(newTasks) => {
                            setUpdatedHobby((prevHobby) => ({
                                ...prevHobby,
                                tasks: newTasks,
                            }));
                        }}
                    />
                </View>
                <View style={styles.listContainer}>
                        <Text style={{
                            fontSize: 15,
                            marginBottom: 4,
                            fontWeight: "bold",
                        }}>Journals:</Text>
                        {journals.length > 0 ? (
                            <FlatList
                                style={styles.journalList}
                                data={journals}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setCurrentJournalEntry(item);
                                            setJournalModalVisible(true);
                                        }}
                                    >
                                        <View style={styles.journalCard}>
                                            <Text style={styles.journalText}>
                                                • {item.text}
                                            </Text>
                                            <Text style={styles.journalDate}>
                                                {new Date(
                                                    item.timestamp
                                                ).toLocaleString()}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.id.toString()}
                            />
                        ) : (
                            <Text style={styles.emptyJournalText}>
                                No journal entries yet. Add a new entry!
                            </Text>
                        )}
                        <TouchableOpacity
                            style={styles.addJournalButton}
                            onPress={() => setJournalModalVisible(true)}
                        >
                            <AntDesign
                                name="pluscircle"
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => handleSavePressed()}
                            style={styles.saveButton}
                        >
                            <Text style={styles.saveText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => showDeleteModal(true)}
                            style={styles.deleteButton}
                        >
                            <Text style={[styles.saveText, { color: "white" }]}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={deleteModal}
                        onRequestClose={() => showDeleteModal(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.deleteModal}>
                                <Text style={styles.deleteModalText}>
                                    WARNING: THIS ACTION IS IRREVERSIBLE.
                                </Text>
                                <Text style={styles.deleteModalText}>
                                    Deleted Hobbies cannot be restored.
                                </Text>
                                <View
                                    style={{
                                        width: "100%",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <TouchableOpacity
                                        style={styles.deleteModalButton}
                                        onPress={() => handleDeletePressed()}
                                    >
                                        <Text
                                            style={styles.deleteModalButtonText}
                                        >
                                            Proceed
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={
                                            styles.deleteModalButtonTransparent
                                        }
                                        onPress={() => showDeleteModal(false)}
                                    >
                                        <Text
                                            style={styles.deleteModalButtonText}
                                        >
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal
    animationType="slide"
    transparent={true}
    visible={journalModalVisible}
    onRequestClose={closeJournalModal}
>
    <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <TextInput
                style={styles.modalTextInput}
                value={currentJournalEntry ? currentJournalEntry.text : newJournalText}
                onChangeText={(text) =>
                    currentJournalEntry
                        ? setCurrentJournalEntry({
                              ...currentJournalEntry,
                              text,
                          })
                        : setNewJournalText(text)
                }
                placeholder="Journal entry"
                multiline={true}
            />
            <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                    style={[styles.modalButton, styles.yellowButton]}
                    onPress={() =>
                        currentJournalEntry
                            ? updateJournalEntry(currentJournalEntry.id, currentJournalEntry.text)
                            : addJournalEntry()
                    }
                >
                    <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
                {currentJournalEntry && (
                    <TouchableOpacity
                        style={[styles.modalButton, styles.yellowButton]}
                        onPress={() => deleteJournalEntry(currentJournalEntry.id)}
                    >
                        <Text style={styles.modalButtonText}>Delete</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={[styles.modalButton, styles.yellowButton]}
                    onPress={closeJournalModal}
                >
                    <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
</Modal>
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

    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: "hidden",
        marginBottom: 10,
    },
    profilePic: {
        width: "100%",
        height: "100%",
    },
    placeholderImage: {
        width: "100%",
        height: "100%",
        backgroundColor: "#e1e1e1",
        justifyContent: "center",
        alignItems: "center",
    },

    journalContainer: {
        backgroundColor: "#FFFACD", // Light yellow color
        borderRadius: 10,
        padding: 15,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    journalList: {
        maxHeight: 200,
    },
    journalCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    journalText: {
        fontSize: 16,
    },
    journalDate: {
        fontSize: 12,
        color: "#888",
        marginTop: 5,
    },
    emptyJournalText: {
        color: "grey",
        fontStyle: "italic",
    },
    addJournalButton: {
        alignSelf: "center",
        marginTop: 10,
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%", 
    },
    saveJournalButton: {
        backgroundColor: "#4CAF50",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    saveJournalButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    deleteJournalButton: {
        backgroundColor: "#F44336",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    deleteJournalButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    closeJournalButton: {
        backgroundColor: "#2196F3",
        borderRadius: 5,
        padding: 10,
    },
    closeJournalButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    modalButton: {
        borderRadius: 5,
        padding: 10,
        margin: 5,
        flex: 1,  // Make the buttons take equal space
        justifyContent: "center",
        alignItems: "center",
    },
    yellowButton: {
        backgroundColor: "yellow",
    },
    modalButtonText: {
        color: "black",
        fontWeight: "bold",
    },
    modalTextInput: {
        height: 40,
        width: "100%",
        fontSize: 20,
        color: "black",
        textAlign: "center",
    },modalButton: {
        borderRadius: 5,
        padding: 10,
        margin: 5,
        flex: 1,  // Make the buttons take equal space
        justifyContent: "center",
        alignItems: "center",
    },
    yellowButton: {
        backgroundColor: "#fffacd",
    },
    modalButtonText: {
        color: "black",
        fontWeight: "bold",
    },
    modalTextInput: {
        height: 40,
        width: "100%",
        fontSize: 20,
        color: "black",
        textAlign: "center",
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        elevation: 5,
        backgroundColor: "pink",
        width: "80%", 
    },
});
