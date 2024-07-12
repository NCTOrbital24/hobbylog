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
import { AntDesign } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import { Hobby } from "../../functions/HobbyConstructor";
import { useRouter } from "expo-router";
import Checkbox from "../Checkbox";

export default function HobbyCard({ hobby }: { hobby: Hobby }) {
    const router = useRouter();
    const navigateToGoal = (index) => {};
    const navigateToTask = (index) => {};
    const hobbyId = hobby._id;

    const [goalList, showGoalList] = useState(true);
    const [taskList, showTaskList] = useState(true);
    const [checkbox, setCheckbox] = useState<Array<boolean>>(
        new Array(hobby.goals.length).fill(false)
    );

    const goals = hobby.goals;
    const tasks = hobby.tasks;
    let goalsCompleted = 0;

    for (let i = 0; i < goals.length; i++) {
        const goal = goals[i];
        if (goal.completed) {
            goalsCompleted++;
        }
    }

    const setCheckboxAtIndex = (index, value) => {
        const updatedCheckbox = [...checkbox];
        updatedCheckbox[index] = value;
        setCheckbox(updatedCheckbox);
    };

    console.log(checkbox);

    const toggleGoalList = () => {
        showGoalList((prev) => !prev); // Toggle goalList state independently
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                onPress={() =>
                    router.push({
                        pathname: "EditHobbyPage",
                        params: { hobbyId: hobbyId },
                    })
                }
            >
                <View style={styles.header}>
                    <View style={image.icon}>
                        <Image
                            style={image.dp}
                            source={{
                                uri: "https://upload.wikimedia.org/wikipedia/commons/6/62/240329_Kim_Chae-won_%281%29.jpg",
                            }}
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
                    <TouchableOpacity
                        onPress={toggleGoalList}
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

                        <AntDesign name="caretdown" size={12} color="black" />
                    </TouchableOpacity>
                    <Collapsible collapsed={goalList}>
                        <FlatList
                            style={styles.list}
                            data={goals}
                            renderItem={({ item, index }) => (
                                <View style={styles.card}>
                                    <Checkbox
                                        value={checkbox[index]}
                                        onValueChange={(value) =>
                                            setCheckboxAtIndex(index, !value)
                                        }
                                        size={18}
                                        color={"black"}
                                        style={styles.checkbox}
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
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </Collapsible>
                </View>

                <View style={styles.listContainer}>
                    <TouchableOpacity
                        onPress={() => showTaskList(!taskList)}
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

                        <AntDesign name="caretdown" size={12} color="black" />
                    </TouchableOpacity>
                    <Collapsible collapsed={taskList}>
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
                                            <Text>
                                                Frequency: {item.frequency}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        ) : (
                            <Text style={{ color: "grey" }}>
                                No tasks yet. Add a new task!
                            </Text>
                        )}
                    </Collapsible>
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
