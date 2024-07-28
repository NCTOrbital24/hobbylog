import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    ScrollView,
    Modal,
    Button,
    TouchableOpacity,
} from "react-native";
import { backendLink } from "@/constants/constants";
import { Hobby } from "@/functions/HobbyConstructor";
import { fetchProfile } from "@/functions/apiUser";
import Background from "@/assets/images/defaultBackground.png";
import HobbySearchCard from "@/components/CommunityScreen/HobbySearchCard";
import { FontAwesome6, AntDesign } from "@expo/vector-icons";

export default function UserCommunityScreen() {
    const router = useRouter();
    const { userId } = useLocalSearchParams();
    const [user, setUser] = useState(null);
    const [showFriendSucessModal, setShowFriendSuccessModal] = useState(false);
    const [profile, setProfile] = useState({
        username: "",
        userId: userId,
        hobbies: [
            {
                _id: "hey",
                name: "hobbyName",
                description: "hobbyDescription",
                icon: "hobbyIcon",
                owner: "hobbyOwner",
                goalsLength: 1,
                tasksLength: 1,
            },
        ],
        bio: "",
        profileImage:
            "https://6.soompi.io/wp-content/uploads/image/a7d15834c0204c7f9d0f04b0b5302acf/dummy.jpeg?s=900x600&e=t",
    });
    const goBack = () => {
        router.back();
    }

    const addAsFriend = async () => {
        try {
            const response = await fetch(
                `${backendLink}/api/friend/${userId}/add`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to add friend");
            }
            setShowFriendSuccessModal(true);
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    const getProfile = async () => {
        try {
            const result = await fetchProfile(userId);
            setProfile(result);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getProfile();
        }, [])
    );

    return (
        <ImageBackground source={Background} style={styles.background}>
            <View style={styles.topHeader}>
                <TouchableOpacity onPress={() => goBack()}>
                    <AntDesign name="back" size={24} color="#e8e8e8" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        addAsFriend();
                    }}
                >
                    <FontAwesome6 name="add" size={24} color="#e8e8e8" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Image
                        style={styles.userImg}
                        source={{ uri: profile.profileImage }}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.box}>
                        <Text>{profile.username}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.input}>{profile.bio}</Text>
                    </View>
                    <View style={styles.container}>
                        {profile.hobbies.map((item, index) => (
                            <HobbySearchCard hobbyInfo={item} />
                        ))}
                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showFriendSucessModal}
                onRequestClose={() => setShowFriendSuccessModal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Friend added!</Text>
                        <Button
                            title="close"
                            onPress={() => setShowFriendSuccessModal(false)}
                        />
                    </View>
                </View>
            </Modal>
        </ImageBackground>
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
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    scrollContainer: {
        alignItems: "center",
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    topHeader: {
        width: "100%",
        height: "7%",
        backgroundColor: "#9F2B68",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: "4%",
        position: "relative",
    },
    header: {
        alignItems: "center",
        paddingVertical: 15,
    },
    userImg: {
        borderRadius: 50,
        width: 100,
        height: 100,
    },
    editText: {
        fontSize: 16,
        textAlign: "center",
        color: "#6495ed",
        marginTop: 10,
    },
    inputContainer: {
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 30,
    },
    box: {
        backgroundColor: "#fffacd",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
    },
    input: {
        fontSize: 16,
        color: "#000",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 5,
    },
    buttonContainer: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        padding: 20,
        backgroundColor: "transparent",
        alignItems: "center",
    },
    uploadButton: {
        backgroundColor: "#fffacd",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    uploadButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
});
