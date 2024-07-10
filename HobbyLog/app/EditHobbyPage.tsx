import React, { useState, useEffect } from "react";
import {
    View, Text, FlatList, StyleSheet, ImageBackground,
} from "react-native";
import AddGoalModal from "@/components/HobbyCreation/AddGoalModal";
import AddTaskModal from "@/components/HobbyCreation/AddTaskModal";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Hobby } from "@/functions/HobbyConstructor";

import { backendLink } from "@/constants/constants";
import parseHobby from "@/functions/ParseHobby";

export default function EditHobbyPage() {
    const router = useRouter();
    const { hobbyId } = useLocalSearchParams();
    const updateLink = backendLink + "/" + hobbyId + "/update";
    const retrieveLink = backendLink + "/" + hobbyId + "/get";
    const [hobby, setHobby] = useState(null);
    const getHobby = async () => {
        try {
            const response = await fetch(retrieveLink, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
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
    }

    useEffect(() => {
        getHobby();
    }, []);

    return (
        <View>
            <Text>Test!</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});