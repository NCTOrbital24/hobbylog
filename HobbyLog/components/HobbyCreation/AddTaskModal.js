import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function AddTaskModal({
    visible,
    closeModal,
    task,
    tasks,
    setTasks,
}) {
    const initialTask = { name: "", description: "", frequency: "daily" };
    const [editedTask, setEditedTask] = useState({ ...task });
    const [error, showError] = useState(false);

    const [selectedFrequency, setSelectedFrequency] = useState("daily");

    useEffect(() => {
        setEditedTask({ ...task });
    }, [task]);

    const handleInputChange = (name, value) => {
        setEditedTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const saveTask = () => {
        if (editedTask.name && editedTask.name !== "") {
            const updatedTasks = task
                ? tasks.map((t) => (t === task ? editedTask : t))
                : [...tasks, editedTask];
            setTasks(updatedTasks);
            showError(false);
            setEditedTask(initialTask);
            closeModal();
        } else {
            showError(true);
        }
    };

    const deleteTask = () => {
        const updatedTasks = tasks.filter((t) => t !== task);
        setTasks(updatedTasks);
        setEditedTask(initialTask);
        closeModal();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => closeModal()}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Task name"
                        value={editedTask.name}
                        onChangeText={(text) => handleInputChange("name", text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Task description"
                        value={editedTask.description}
                        onChangeText={(text) =>
                            handleInputChange("description", text)
                        }
                    />
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <Text style={styles.freqText}>Repeat</Text>
                    <Picker
                        selectedValue={selectedFrequency}
                        onValueChange={(itemValue) => {
                            handleInputChange("frequency", itemValue);
                            setSelectedFrequency(itemValue);
                        }}
                        style={styles.picker}
                    >
                        <Picker.Item
                            label="Daily"
                            value="daily"
                            color="black"
                            style={styles.pickerItem}
                        />
                        <Picker.Item
                            label="Weekly"
                            value="weekly"
                            color="black"
                            style={styles.pickerItem}
                        />
                        <Picker.Item
                            label="Monthly"
                            value="monthly"
                            color="black"
                            style={styles.pickerItem}
                        />
                        </Picker>
                        <Text style={styles.freqText}>at</Text>
                        </View>
                    {error && <Text>Invalid Task!</Text>}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={saveTask}
                        >
                            <Text style={styles.buttonText}>Save Task</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={deleteTask}
                        >
                            <Text style={styles.buttonText}>Delete Task</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setEditedTask(initialTask);
                                showError(false);
                                closeModal();
                            }}
                        >
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
    },
    input: {
        height: 40,
        width: "80%",
        fontSize: 20,
        color: "black",
        textAlign: "center",
    },
    picker: {
        height: 40,
        width: 160,
    },
    pickerItem: {
        backgroundColor: "pink",
        color: "black",
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#fffdd0",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 8,
        paddingRight: 8,
        height: "auto",
        borderRadius: 5,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        color: "#141414",
    },
    freqText: {
        fontSize: 20,
    }
});
