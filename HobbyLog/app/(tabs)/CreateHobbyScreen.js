import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Button,
    FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import Background from "@/assets/images/defaultBackground.png";
import AddGoalModal from "../../components/HobbyCreation/AddGoalModal";
import AddTaskModal from "../../components/HobbyCreation/AddTaskModal";
import { AntDesign } from '@expo/vector-icons';

export default function CreateHobbyScreen() {
    const router = useRouter();
    const [goals, setGoals] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [goalModalGoal, setGoalModalGoal] = useState();
    const [taskModalTask, setTaskModalTask] = useState();
    const [goalModal, showGoalModal] = useState(false);
    const [taskModal, showTaskModal] = useState(false);

    const closeGoalModal = () => {
        setGoalModalGoal(undefined);
        showGoalModal(false);
    };
    const closeTaskModal = () => {
        setTaskModalTask(undefined);
        showTaskModal(false);
    };

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

            // Handle navigation or any other action upon successful submission
            // For example, navigate to a different screen; // Replace with your desired navigation logic
        } catch (error) {
            console.error("Error adding hobby:", error);
            // Handle error logic here (e.g., display error message)
        }
    };

    const addGoal = () => {
        if (newGoal.name !== "") {
            const updatedGoals = [...goals, newGoal];
            setGoals(updatedGoals);
            setNewGoal({
                name: "",
                description: "",
                deadline: new Date(),
                completed: false,
            });
            handleInputChange("goals", updatedGoals);
        }
    };

    const addTask = () => {
        if (newTask.name !== "") {
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            setNewTask({
                name: "",
                description: "",
                frequency: "",
                time: -1,
                day: -1,
                month: -1,
            });
            handleInputChange("tasks", updatedTasks);
        }
    };

    const handleInputChange = (name, value) => {
        setHobby((prevHobby) => ({
            ...prevHobby,
            [name]: value,
        }));
    };

    const navigateToAddGoal = (index) => {
        const selectedGoal = goals[index];
        setGoalModalGoal(selectedGoal);
        showGoalModal(true);
    };

    const navigateToAddTask = (index) => {
        const selectedTask = tasks[index];
        setTaskModalTask(selectedTask);
        showTaskModal(true);
    };

    return (
        <ImageBackground source={Background} style={styles.background}>
            <View style={styles.root}>
                <View style={styles.box}>
                    <TextInput
                        textAlign="center"
                        style={styles.input}
                        placeholder="Give your hobby a name"
                        value={hobby.name}
                        onChangeText={(text) => handleInputChange("name", text)}
                    />
                </View>
                <View style={styles.box}>
                    <TextInput
                        textAlign="center"
                        style={styles.input}
                        placeholder="Write some words about your hobby"
                        value={hobby.description}
                        onChangeText={(text) =>
                            handleInputChange("description", text)
                        }
                    />
                </View>
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
                                    onPress={() => navigateToAddGoal(index)}
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
                    {tasks.length > 0 ? (
                        <FlatList
                            style={styles.list}
                            data={tasks}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => navigateToAddTask(index)}
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
                                    <TouchableOpacity
                    style={styles.goalButton}
                    onPress={() => {
                        setTaskModalTask(undefined);
                        showTaskModal(true);
                    }}
                >
                    <AntDesign name="pluscircle" size={20} color="black" />
                </TouchableOpacity>
                
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitHobby}>
                    <Text style={styles.submitText}>(っ◔◡◔)っ ♥ Submit! ♥</Text>
                    </TouchableOpacity>
            </View>
            <AddGoalModal
                visible={goalModal}
                closeModal={closeGoalModal}
                goal={goalModalGoal}
                goals={goals}
                setGoals={setGoals}
            />
            <AddTaskModal
                visible={taskModal}
                closeModal={closeTaskModal}
                task={taskModalTask}
                tasks={tasks}
                setTasks={setTasks}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    scrollview: {
        width: "100%",
        height: "100%",
    },
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
        alignItems: "center",
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
    input: {
        fontSize: 16,
        color: "black",
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
    }
});
