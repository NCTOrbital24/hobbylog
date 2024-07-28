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
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from "@expo/vector-icons";

import AddGoalModal from "@/components/HobbyCreation/AddGoalModal";
import AddTaskModal from "@/components/HobbyCreation/AddTaskModal";
import { Hobby, EMPTY_HOBBY } from "@/functions/HobbyConstructor";
import sortGoalsByDeadline from "@/functions/sortGoalsByDeadline";
import { backendLink } from "@/constants/constants";
import parseHobby from "@/functions/ParseHobby";

export default function EditHobbyPage() {
    const router = useRouter();
    const { hobbyId } = useLocalSearchParams();

    const updateLink = `${backendLink}/api/hobby/${hobbyId}/update`;
    const retrieveLink = `${backendLink}/api/hobby/${hobbyId}/get`;
    const deleteLink = `${backendLink}/api/hobby/${hobbyId}/remove`;

    const [hobby, setHobby] = useState(null);
    const [updatedHobby, setUpdatedHobby] = useState(EMPTY_HOBBY);
    const [editable, setEditable] = useState(false);
    const [image, setImage] = useState(null);
    const [journalModalVisible, setJournalModalVisible] = useState(false);
    const [currentJournalEntry, setCurrentJournalEntry] = useState(null);
    const [journals, setJournals] = useState([]);
    const [newJournalText, setNewJournalText] = useState("");

    useFocusEffect(
        useCallback(() => {
            const fetchHobby = async () => {
                try {
                    const response = await fetch(retrieveLink, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    });
                    if (!response.ok) {
                        throw new Error("Failed to retrieve hobby");
                    }
                    const data = await response.json();
                    const updatedData = parseHobby(data);
                    setHobby(updatedData);
                    setUpdatedHobby(updatedData);
                    setImage(updatedData.profilePic);
                } catch (error) {
                    console.error("Error fetching hobby:", error);
                }
            };

            fetchHobby();
        }, [])
    );

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('You need to allow access to your photos to change the image.');
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
            setUpdatedHobby(prev => ({ ...prev, profilePic: result.uri }));
        }
    };

    const handleSavePressed = async () => {
        try {
            const response = await fetch(updateLink, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...updatedHobby, profilePic: image })
            });
            if (!response.ok) {
                throw new Error(`Failed to update hobby, status code: ${response.status}`);
            }
            alert('Hobby updated successfully!');
            router.back();
        } catch (error) {
            console.error("Error updating hobby:", error);
            alert('Error updating hobby.');
        }
    };

    const handleDeletePressed = async () => {
        try {
            const response = await fetch(deleteLink, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error(`Failed to delete hobby, code: ${response.status}`);
            }
            router.back();
        } catch (error) {
            console.error("Error deleting hobby:", error);
        }
    };

    const addJournalEntry = () => {
        const newEntry = {
            id: new Date().getTime(),
            text: newJournalText,
            timestamp: new Date().toISOString(),
        };
        setJournals([newEntry, ...journals]);
        setNewJournalText("");
        setJournalModalVisible(false);
    };

    const updateJournalEntry = (entryId, newText) => {
        const updatedJournals = journals.map(entry =>
            entry.id === entryId ? { ...entry, text: newText } : entry
        );
        setJournals(updatedJournals);
        closeJournalModal();
    };

    const deleteJournalEntry = entryId => {
        setJournals(journals.filter(entry => entry.id !== entryId));
        setJournalModalVisible(false);
    };

    const closeJournalModal = () => {
        setJournalModalVisible(false);
        setCurrentJournalEntry(null);
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="back" size={24} color="#e8e8e8" />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.headerText}>{hobby ? hobby.name : "Loading..."}</Text>
                </View>
                <TouchableOpacity onPress={() => setEditable(!editable)}>
                    <Text style={styles.editButton}>{editable ? "Save" : "Edit"}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                    <Image
                        source={{ uri: image || 'path/to/default_placeholder.png' }}
                        style={styles.profilePic}
                    />
                    <Text>Edit Hobby Image</Text>
                </TouchableOpacity>
                {editable && (
                    <TextInput
                        value={updatedHobby.description}
                        onChangeText={text => setUpdatedHobby(prev => ({ ...prev, description: text }))}
                        style={styles.input}
                        placeholder="Enter a description..."
                    />
                )}
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={handleSavePressed} style={styles.saveButton}>
                    <Text style={styles.saveText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeletePressed} style={styles.deleteButton}>
                    <Text style={styles.deleteText}>Delete Hobby</Text>
                </TouchableOpacity>
            </View>
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
                            onChangeText={text => currentJournalEntry ? setCurrentJournalEntry({ ...currentJournalEntry, text }) : setNewJournalText(text)}
                            placeholder="Journal entry"
                        />
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => currentJournalEntry ? updateJournalEntry(currentJournalEntry.id, currentJournalEntry.text) : addJournalEntry()}
                        >
                            <Text style={styles.textStyle}>Save Journal Entry</Text>
                        </TouchableOpacity>
                        {currentJournalEntry && (
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => deleteJournalEntry(currentJournalEntry.id)}
                            >
                                <Text style={styles.textStyle}>Delete Entry</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeJournalModal}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        color: 'white',
    },
    editButton: {
        color: 'blue',
        fontSize: 18,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        margin: 20,
        alignItems: 'center',s
        justifyContent: 'center',
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ddd',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: '80%',
        padding: 10,
        margin: 10,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        padding: 20,
    },
    saveButton: {
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
    },
    deleteButton: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    saveText: {
        color: 'white',
        fontSize: 16,
    },
    deleteText: {
        color: 'white',
        fontSize: 16,
    },
});