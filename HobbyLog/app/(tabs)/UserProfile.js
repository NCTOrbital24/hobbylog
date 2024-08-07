import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    Pressable,
    ScrollView,
    TouchableOpacity,
    Alert,
    TextInput,
    Button,
    FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Background from "@/assets/images/defaultBackground.png";
import { uploadProfile, fetchProfile } from "@/functions/apiUser";
import * as SecureStore from "expo-secure-store";
import { router, useFocusEffect } from "expo-router";
import HobbySearchCard from "@/components/CommunityScreen/HobbySearchCard";
import fetchImage from "@/functions/fetchImage";

export default function UserProfile() {
    const [profile, setProfile] = useState({
        username: "",
        hobbies: "",
        bio: "",
        profileImage:
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    });
    const [selectedImage, setSelectedImage] = useState(null);

    const id = SecureStore.getItem("id");

    useFocusEffect(
        useCallback(() => {
            const loadProfile = async () => {
                try {
                    const result = await fetchProfile(id);
                    setProfile(result);
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            };

            loadProfile();
        }, [])
    );

    const handleEditProfile = () => {
        router.push("/screens/EditUserProfile");
    };

    return (
        <ImageBackground source={Background} style={styles.background}>
            <View style={styles.scrollContainer}>
                <View style={styles.header}>
                    <Image
                        style={styles.userImg}
                        source={{
                            uri: profile.profileImage
                                ? fetchImage(profile.profileImage)
                                : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
                        }}
                    />
                </View>
                <View style={[styles.inputContainer, styles.details]}>
                    <Text style={styles.username}>{profile.username}</Text>
                    <Text style={styles.username}>Level: {profile.level}</Text>
                    <Text style={styles.username}>Exp: {profile.exp}</Text>
                </View>
                <View style={{ height: "67%" }}>
                    <FlatList
                        data={[1]}
                        renderItem={(item) => (
                            <View style={styles.inputContainer}>
                                <View style={styles.box}>
                                    <Text style={styles.input}>
                                        {profile.bio === ""
                                            ? "No bio! Press the edit button to write one!"
                                            : profile.bio}
                                    </Text>
                                </View>
                                <View>
                                    <FlatList
                                        data={profile.hobbies}
                                        renderItem={({ item }) => (
                                            <HobbySearchCard
                                                hobbyInfo={item}
                                                color="#FFFDD0"
                                            />
                                        )}
                                        keyExtractor={(item) => item._id}
                                    />
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={handleEditProfile}
                >
                    <Text style={styles.uploadButtonText}>Edit Profile</Text>
                </TouchableOpacity>
                <Button
                    title="logout"
                    onPress={() => {
                        SecureStore.deleteItemAsync("email");
                        SecureStore.deleteItemAsync("password");
                        //ping server for username and get it
                        SecureStore.deleteItemAsync("username");
                        SecureStore.deleteItemAsync("id");
                        router.replace("../screens/LoginScreen");
                    }}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    scrollContainer: {
        alignItems: "center",
        paddingTop: 50,
        paddingHorizontal: 20,
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
    details: {
        marginBottom: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    username: {
        fontSize: 16,
        fontWeight: "bold",
    },
    inputContainer: {
        width: "100%",
        paddingHorizontal: 10,
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
        flexWrap: "wrap",
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
        marginBottom: 10,
        borderRadius: 5,
    },
    uploadButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
});
