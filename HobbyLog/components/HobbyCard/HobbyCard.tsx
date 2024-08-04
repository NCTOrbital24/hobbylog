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
import { Hobby } from "../../functions/HobbyConstructor";
import { useRouter } from "expo-router";
import Checkbox from "../Checkbox";
import { backendLink } from "@/constants/constants";

export default function HobbyCard({ hobby }: { hobby: Hobby }) {
    const router = useRouter();
    const navigateToGoal = (index) => {};
    const navigateToTask = (index) => {};
    const hobbyId = hobby._id;

    const goals = hobby.goals;
    const tasks = hobby.tasks;
    let goalsCompleted = 0;
    const checkboxArray = [...goals].map((goal) => goal.completed);
    const taskCheckboxArray = [...tasks].map((task) => {
        const lastDueDate = new Date(task.lastDueDate);
        return lastDueDate > new Date();
    });

    const [taskCheckbox, setTaskCheckbox] =
        useState<Array<boolean>>(taskCheckboxArray);
    const [checkbox, setCheckbox] = useState<Array<boolean>>(checkboxArray);

    for (let i = 0; i < goals.length; i++) {
        const goal = goals[i];
        if (goal.completed) {
            goalsCompleted++;
        }
    }

    const handleTaskChecked = (value, index) => {
        const newTaskCheckbox = [...checkbox];
        newTaskCheckbox[index] = !value;
        const taskId = tasks[index]._id;
        const markTaskAsCompleted = async (
            taskId: string,
            complete: boolean
        ) => {
            try {
                const response = await fetch(
                    `${backendLink}/api/task/${taskId}/markComplete`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to complete task");
                }

                const task = tasks[index];
                const now = new Date();
                task.lastCompleted = task.nextDueDate;
                if (task.frequency === "daily") {
                    task.nextDueDate = new Date(now.setDate(now.getDate() + 1));
                }
                if (task.frequency === "weekly") {
                    task.nextDueDate = new Date(now.setDate(now.getDate() + 7));
                }
                if (task.frequency === "monthly") {
                    task.nextDueDate = new Date(now.setDate(now.getDate() + 1));
                }
            } catch (err) {
                console.error("Error completing task", err);
            }
        };
        markTaskAsCompleted(taskId, true);
    };

    const handleGoalChecked = (value, index) => {
        const newCheckbox = [...checkbox];
        newCheckbox[index] = !value;
        const goalId = goals[index]._id;
        const markGoalAsCompleted = async (
            goalId: string,
            complete: boolean
        ) => {
            try {
                const response = await fetch(
                    `${backendLink}/api/goal/${goalId}/${
                        complete ? "markIncomplete" : "markComplete"
                    }`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to complete goal");
                }

                goals[index].completed = !goals[index].completed;
                setCheckbox(newCheckbox);

                //const data = await response.json();
            } catch (err) {
                console.error("Error completing goal", err);
            }
        };
        markGoalAsCompleted(goalId, goals[index].completed);
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                onPress={() =>
                    router.push({
                        pathname: "EditHobbyScreen",
                        params: { hobbyId: hobbyId },
                    })
                }
            >
                <View style={styles.header}>
                    <View style={styles.icon}>
                        <Image
                            source={{
                                uri: "https://images.squarespace-cdn.com/content/v1/5c6e2dad94d71a1ea569fca0/1624344400741-2VUMN1MRI6UD50VFLYXG/Painting",
                            }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <View style={progressBar.container}>
                            {hobby.goals.length !== 0 ? (
                                <View
                                    style={[
                                        progressBar.progress,
                                        {
                                            width: `${
                                                (goalsCompleted /
                                                    goals.length) *
                                                100
                                            }%`,
                                        },
                                        goalsCompleted === hobby.goals.length
                                            ? {
                                                  backgroundColor: "#673147",
                                              }
                                            : { backgroundColor: "#DE3163" },
                                    ]}
                                ></View>
                            ) : (
                                <View></View>
                            )}
                        </View>
                        <Text style={progressBar.text}>
                            {goalsCompleted} out of {goals.length} completed.
                        </Text>

                        <Text style={styles.nameText}>{hobby.name}</Text>
                        <Text style={styles.bodyText}>{hobby.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={styles.body}>
                <View style={styles.listContainer}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingRight: 1,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                marginBottom: 4,
                                fontWeight: "bold",
                            }}
                        >
                            Goals:
                        </Text>
                    </View>
                    <FlatList
                        style={styles.list}
                        data={goals}
                        renderItem={({ item, index }) => (
                            <View style={styles.card}>
                                <Checkbox
                                    value={checkbox[index]}
                                    onValueChange={(value) => {
                                        handleGoalChecked(value, index);
                                    }}
                                    size={18}
                                    color={"black"}
                                    style={styles.checkbox}
                                    pressable={true}
                                />
                                <View style={{ flex: 1, paddingLeft: 8 }}>
                                    <Text
                                        style={[
                                            {
                                                fontSize: 18,
                                                marginBottom: 1,
                                            },
                                            checkbox[index]
                                                ? {
                                                      textDecorationLine:
                                                          "line-through",
                                                  }
                                                : null,
                                        ]}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text>{item.description}</Text>
                                    <Text>
                                        Deadline:{" "}
                                        {new Date(
                                            item.deadline
                                        ).toLocaleDateString()}
                                    </Text>
                                    <Text>Reward: {item.exp} exp</Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                <View style={styles.listContainer}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingRight: 1,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                marginBottom: 4,
                                fontWeight: "bold",
                            }}
                        >
                            Tasks:
                        </Text>
                    </View>
                    {tasks.length > 0 ? (
                        <FlatList
                            style={styles.list}
                            data={tasks}
                            renderItem={({ item, index }) => (
                                <View style={styles.taskCard}>
                                    <Checkbox
                                        value={taskCheckbox[index]}
                                        onValueChange={(value) => {
                                            handleTaskChecked(value, index);
                                        }}
                                        size={18}
                                        color={"black"}
                                        style={styles.checkbox}
                                        pressable={true}
                                    />
                                    <View style={{ flex: 1, paddingLeft: 8 }}>
                                        <Text
                                            style={[
                                                {
                                                    fontSize: 18,
                                                    marginBottom: 1,
                                                },
                                                checkbox[index]
                                                    ? {
                                                          textDecorationLine:
                                                              "line-through",
                                                      }
                                                    : null,
                                            ]}
                                        >
                                            {item.name}
                                        </Text>
                                        <Text>{item.description}</Text>
                                        <Text>Frequency: {item.frequency}</Text>
                                        <Text>Exp: {item.exp}</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    ) : (
                        <Text style={{ color: "grey" }}>
                            No tasks yet. Add a new task!
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        width: "70%",
        borderRadius: 10,
    },
    header: {
        flexDirection: "row",
        width: "100%",
        marginBottom: "2%",
        justifyContent: "space-between",
        paddingLeft: 15,
    },
    list: {
        flex: 1,
    },
    listContainer: {
        width: "100%",
        backgroundColor: "#fffdd0",
        paddingTop: 8,
        paddingLeft: 17,
        paddingRight: 15,
        paddingBottom: 5,
        borderRadius: 15,
        marginBottom: 8,
    },
    card: {
        backgroundColor: "#ffd1dc",
        color: "#141414",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 7,
        flexDirection: "row",
    },
    taskCard: {
        backgroundColor: "#F2E6FF",
        color: "#141414",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 7,
        flexDirection: "row",
    },
    wrapper: {
        backgroundColor: "#FFF8DC",
        justifyContent: "space-between",
        marginBottom: "5%",
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: "center",
    },
    body: {
        width: "100%",
        height: "auto",
        marginLeft: 10,
        alignItems: "flex-start",
        flexDirection: "column",
    },
    bodyText: {
        fontSize: 14,
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    checkbox: {
        paddingTop: 4,
    },

    image: {
        width: "100%",
        height: "100%",
    },

    icon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "pink",
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
        height: 10,
        borderRadius: 3,
    },
    text: {
        fontSize: 14,
    },
});

const image = StyleSheet.create({
    icon: {
        minWidth: 40,
        height: "auto",
        marginLeft: 10,
        marginRight: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    dp: {
        height: 80,
        width: 80,
        borderRadius: 40,
        resizeMode: "cover",
    },
});
