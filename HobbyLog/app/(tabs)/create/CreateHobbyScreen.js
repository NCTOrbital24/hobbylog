import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Modal,
    TextInput,
    Button,
    FlatList,
} from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Background from "@/assets/images/defaultBackground.png";
import { Picker } from "@react-native-picker/picker";
import { backendLink } from "../../../constants/constants";
import DateTimePicker from "@react-native-community/datetimepicker";

const createLink = backendLink + "/api/hobby/create";

//should hobby come from backend?
import HobbyConstructor from "@/functions/HobbyConstructor";

export default function CreateHobbyScreen() {
    const [username, setUsername] = useState(null);
    const storedUsername = SecureStore.getItem("username");
    const userId = SecureStore.getItem("id");
    const [modalVisible, setModalVisible] = useState(false);
    const [taskModalVisible, setTaskModalVisible] = useState(false);
    const [dateConfirmed, setDateConfirmed] = useState(false);
    const [goals, setGoals] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [newGoal, setNewGoal] = useState({
        name: "",
        description: "",
        deadline: new Date(),
        completed: false,
    });
    const [newTask, setNewTask] = useState({
        name: "",
        description: "",
        frequency: "",
        time: -1,
        day: -1,
        month: -1,
    });
    const [hobby, setHobby] = useState({
        name: "",
        description: "",
        goals: [],
        tasks: [],
    });

    const addTask = () => {
        if (newTask.name !== "") {
            setTasks([...tasks, newTask]);
            setNewTask({
                name: "",
                description: "",
                frequency: "",
                time: -1,
                day: -1,
                month: -1,
            });
            handleInputChange("tasks", tasks);
            setTaskModalVisible(false); // Close the modal after adding goal
        }
    };

    const addGoal = () => {
        if (newGoal.name !== "") {
            setGoals([...goals, newGoal]);
            setNewGoal({
                name: "",
                description: "",
                deadline: new Date(),
                completed: false,
            });
            handleInputChange("goals", goals);
            setModalVisible(false); // Close the modal after adding goal
        }
    };

    const deleteGoal = (index) => {
        const updatedGoals = goals.filter((_, i) => i !== index);
        setGoals(updatedGoals);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handleInputChange = (name, value) => {
        setHobby({
            ...hobby,
            [name]: value,
        });
    };

    const handleSubmitHobby = async () => {
        const data = {
            hobbyName: hobby.name,
            hobbyDescription: hobby.description,
            goals: goals,
            tasks: tasks,
        };

        try {
            const response = await fetch(createLink, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to add hobby");
            }

            // Clear state or navigate to another screen upon success
            setHobby({
                name: "",
                description: "",
                goals: [],
                tasks: [],
            });
            setGoals([]);
            setTasks([]);
            setModalVisible(false);
            setTaskModalVisible(false);

            //redirect here
        } catch (error) {
            console.error("Error adding hobby:", error);
            // Handle error logic here (e.g., display error message)
        }
    };
    return (
        <ImageBackground source={Background} style={styles.background}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Create A Hobby</Text>
            </View>
            <View style={styles.root}>
                {/* Ninett's icon picker goes here */}
                <View style={styles.box}>
                    <TextInput
                        style={styles.input}
                        placeholder="Give your hobby a name"
                        value={hobby.name}
                        onChangeText={(text) => handleInputChange("name", text)}
                    />
                </View>
                <View style={styles.box}>
                    <TextInput
                        style={styles.input}
                        placeholder="Write some words about your hobby"
                        value={hobby.description}
                        onChangeText={(text) =>
                            handleInputChange("description", text)
                        }
                    />
                </View>
                <Text style={{ fontSize: 24, marginBottom: 20 }}>
                    My Hobby Goals
                </Text>
                <View style={styles.listContainer}>
                    {goals.length > 0 ? (
                        <FlatList
                            style={styles.list}
                            data={goals}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => deleteGoal(index)}
                                >
                                    <View
                                        style={{
                                            marginBottom: 10,
                                            padding: 10,
                                            backgroundColor: "#f0f0f0",
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                marginBottom: 5,
                                            }}
                                        >
                                            {item.name}
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
                        <Text>No goals yet. Add a new goal!</Text>
                    )}
                </View>
                <TouchableOpacity
                    style={styles.goalButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text>Add Goal</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 24, marginBottom: 20 }}>
                    My Hobby Tasks
                </Text>
                <View style={styles.listContainer}>
                    {tasks.length > 0 ? (
                        <FlatList
                            style={styles.list}
                            data={tasks}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => deleteTask(index)}
                                >
                                    <View
                                        style={{
                                            marginBottom: 10,
                                            padding: 10,
                                            backgroundColor: "#f0f0f0",
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                marginBottom: 5,
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                        <Text>{item.description}</Text>
                                        <Text>Frequency: {item.frequency}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    ) : (
                        <Text>No tasks yet. Add a new goal!</Text>
                    )}
                </View>
                <TouchableOpacity
                    style={styles.goalButton}
                    onPress={() => setTaskModalVisible(true)}
                >
                    <Text>Add Task</Text>
                </TouchableOpacity>

                <Button
                    style={styles.submitButton}
                    onPress={() => handleSubmitHobby()}
                    title="Submit!"
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "white",
                                padding: 20,
                                borderRadius: 10,
                                width: "80%",
                            }}
                        >
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>
                                Add a New Goal
                            </Text>
                            <TextInput
                                style={{
                                    height: 40,
                                    borderColor: "gray",
                                    borderWidth: 1,
                                    marginBottom: 10,
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={(text) =>
                                    setNewGoal({ ...newGoal, name: text })
                                }
                                value={newGoal.name}
                                placeholder="Enter goal name"
                            />
                            <TextInput
                                style={{
                                    height: 40,
                                    borderColor: "gray",
                                    borderWidth: 1,
                                    marginBottom: 10,
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={(text) =>
                                    setNewGoal({
                                        ...newGoal,
                                        description: text,
                                    })
                                }
                                value={newGoal.description}
                                placeholder="Enter goal description"
                            />
                            <Button
                                title="Set a deadline"
                                onPress={() => {
                                    setOpen(true);
                                    setDateConfirmed(false);
                                }}
                            />
                            {dateConfirmed && (
                                <Text>
                                    Deadline: {date.toLocaleDateString()}
                                </Text>
                            )}
                            {open && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate;
                                        setDate(currentDate);
                                        setNewGoal({
                                            ...newGoal,
                                            deadline: currentDate,
                                        });
                                        setDateConfirmed(true);
                                        setOpen(false);
                                    }}
                                />
                            )}
                            <Button title="Add Goal" onPress={addGoal} />
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={taskModalVisible}
                    onRequestClose={() => setTaskModalVisible(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "white",
                                padding: 20,
                                borderRadius: 10,
                                width: "80%",
                            }}
                        >
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>
                                Add a New Task
                            </Text>
                            <TextInput
                                style={{
                                    height: 40,
                                    borderColor: "gray",
                                    borderWidth: 1,
                                    marginBottom: 10,
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={(text) =>
                                    setNewTask({ ...newTask, name: text })
                                }
                                value={newTask.name}
                                placeholder="Enter task name"
                            />
                            <TextInput
                                style={{
                                    height: 40,
                                    borderColor: "gray",
                                    borderWidth: 1,
                                    marginBottom: 10,
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={(text) =>
                                    setNewTask({
                                        ...newTask,
                                        description: text,
                                    })
                                }
                                value={newTask.description}
                                placeholder="Enter task description"
                            />
                            <Picker
                                selectedValue={newTask.frequency}
                                onValueChange={(itemValue) =>
                                    setNewTask({
                                        ...newTask,
                                        frequency: itemValue,
                                    })
                                }
                            >
                                <Picker.Item label="Daily" value="daily" />
                                <Picker.Item label="Weekly" value="weekly" />
                                <Picker.Item label="Monthly" value="monthly" />
                            </Picker>

                            <Button title="Add Task" onPress={addTask} />
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "15%",
    },
    root: {
        width: "100%",
        height: "100%",
        padding: "7%",
    },
    header: {
        width: "100%",
        height: "10%",
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
    },
    icon: {
        height: "50%",
        width: "50%",
    },
    headerText: {
        fontSize: 36,
    },
    headerIcon: {
        height: 15,
        width: 15,
    },
    goalButton: {
        borderWidth: 1,
        borderColor: "green",
        backgroundColor: "pink",
    },
    list: {},
    listContainer: {},
});
