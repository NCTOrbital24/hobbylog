import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    StyleSheet,
    Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddGoalModal({
    visible,
    closeModal,
    goal,
    goals,
    setGoals,
}) {
    const initialGoal = { name: "", description: "", deadline: null };
    const [editedGoal, setEditedGoal] = useState({ ...initialGoal });
    const [open, setOpen] = useState(false);
    const [dateConfirmed, setDateConfirmed] = useState(false);
    const [date, setDate] = useState(editedGoal.deadline || new Date());
    const [error, showError] = useState(false);

    useEffect(() => {
        setEditedGoal({ ...goal });
    }, [goal]);

    const handleInputChange = (name, value) => {
        setEditedGoal((prevGoal) => ({
            ...prevGoal,
            [name]: value,
        }));
    };

    function isValidDate(date) {
        return date instanceof Date && !isNaN(date);
    }

    function checkValidGoal() {
        return editedGoal.name && editedGoal.name !== "" && isValidDate(editedGoal.deadline);
    }

    const saveGoal = () => {
        if (checkValidGoal()) {
            const updatedGoals = goal
                ? goals.map((g) => (g === goal ? editedGoal : g))
                : [...goals, editedGoal];
            setGoals(updatedGoals);
            setDateConfirmed(false);
            setEditedGoal(initialGoal);
            showError(false);
            closeModal();
        } else {
            showError(true);
        }
    };

    const deleteGoal = () => {
        const updatedGoals = goals.filter((g) => g !== goal);
        setGoals(updatedGoals);
        setDateConfirmed(false);
        setEditedGoal(initialGoal);
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
                        style={[styles.input, styles.textInput]}
                        placeholder="Goal name"
                        value={editedGoal.name}
                        onChangeText={(text) => handleInputChange("name", text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Goal description"
                        value={editedGoal.description}
                        onChangeText={(text) =>
                            handleInputChange("description", text)
                        }
                    />
                    <TouchableOpacity
                        style={styles.deadlineButton}
                        onPress={() => {
                            setOpen(true);
                        }}
                    >
                        {dateConfirmed ? (
                            <Text style={styles.deadlineText}>
                                Deadline: {date.toLocaleDateString()}
                            </Text>
                        ) : (
                            <Text style={styles.deadlineText}>
                                Set A Deadline!
                            </Text>
                        )}
                    </TouchableOpacity>
                    {open && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                const currentDate =
                                    selectedDate || editedGoal.deadline;
                                setDate(currentDate);
                                setEditedGoal((prevGoal) => ({
                                    ...prevGoal,
                                    deadline: currentDate,
                                }));
                                setDateConfirmed(true);
                                showError(false);
                                setOpen(false);
                            }}
                        />
                    )}
                    {error && <Text>Invalid Goal!</Text>}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={saveGoal}
                        >
                            <Text style={styles.buttonText}>Save Goal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={deleteGoal}
                        >
                            <Text style={styles.buttonText}>Delete Goal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                showError(false);
                                closeModal();
                            }
                            }
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
    },
    deadlineText: {
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
});
