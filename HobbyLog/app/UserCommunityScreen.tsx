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
import { FontAwesome6, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import fetchImage from "@/functions/fetchImage";

export default function UserCommunityScreen() {
    const router = useRouter();
    const { userId, isFriend } = useLocalSearchParams();
    const [showFriendSucessModal, setShowFriendSuccessModal] = useState(false);
    const [showFriendRemoveModal, setShowFriendRemoveModal] = useState(false);
    const [friendButton, showFriendButton] = useState(isFriend === "true" ? true : false);
    const [profile, setProfile] = useState({
        username: "",
        userId: "",
        hobbies: [],
        bio: "",
        profileImage:
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    });
    const goBack = () => {
        router.back();
    };

    const removeAsFriend = async () => {
        try {
            const response = await fetch(
                `${backendLink}/api/friend/${userId}/remove`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to remove friend");
            }
            setShowFriendRemoveModal(true);
            showFriendButton(!friendButton);
        } catch (error) {
            console.error("Error removing friend:", error);
        }
    };

    const addAsFriend = async () => {
        try {
            const response = await fetch(
                `${backendLink}/api/friend/${userId}/add`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to add friend");
            }
            setShowFriendSuccessModal(true);
            showFriendButton(!friendButton);
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    const getProfile = async () => {
        try {
            const result = await fetchProfile(userId);
            setProfile((prevProfile) => ({
                ...prevProfile,
                ...result,
                profileImage: fetchImage(result.profileImage),
            }));
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
                    onPress={() =>
                        friendButton ? removeAsFriend() : addAsFriend()
                    }
                >
                    {friendButton ? (
                        <FontAwesome5
                            name="user-minus"
                            size={24}
                            color="#e8e8e8"
                        />
                    ) : (
                        <FontAwesome6 name="add" size={24} color="#e8e8e8" />
                    )}
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
                    <View
                        style={{
                            alignItems: "center",
                            marginBottom: 20,
                        }}
                    >
                        <Text style={{fontSize: 20, fontWeight: "bold"}}>{profile.username}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.input}>{profile.bio === "" ? "This user has no bio." : profile.bio}</Text>
                    </View>
                    <View>
                        {profile.hobbies.map((item, index) => (
                            <HobbySearchCard hobbyInfo={item} key={item._id} />
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={showFriendRemoveModal}
                onRequestClose={() => setShowFriendRemoveModal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Friend removed!</Text>
                        <Button
                            title="close"
                            onPress={() => setShowFriendRemoveModal(false)}
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
