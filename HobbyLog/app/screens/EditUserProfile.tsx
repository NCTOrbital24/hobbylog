import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Background from "@/assets/images/defaultBackground.png";
import { uploadProfile, fetchProfile } from "@/functions/apiUser";
import * as SecureStore from "expo-secure-store";
import { router, useFocusEffect } from "expo-router";
import fetchImage from "@/functions/fetchImage";

export default function EditUserProfile() {
    const defaultProfile = {
        username: "",
        bio: "",
        profileImage: "https://6.soompi.io/wp-content/uploads/image/a7d15834c0204c7f9d0f04b0b5302acf/dummy.jpeg?s=900x600&e=t",
    };
    const [profile, setProfile] = useState(defaultProfile);
    const [selectedImage, setSelectedImage] = useState(null);

    const getId = async () => {
        const id = await SecureStore.getItemAsync("id");
        return id;
    };

    useFocusEffect(
        useCallback(() => {
            const loadProfile = async () => {
                try {
                    const id = await getId();
                    const result = await fetchProfile(id);
                    setProfile({
                        ...result,
                        profileImage: fetchImage(result.profileImage)
                    });
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            };

            loadProfile();
        }, [])
    );

    const handleInputChange = (name, value) => {
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleUploadProfile = async () => {
        if (profile.username === "") {
            Alert.alert("Username cannot be empty!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("username", profile.username);
            formData.append("bio", profile.bio);

            if (selectedImage) {
                const uriParts = selectedImage.split(".");
                const fileType = uriParts[uriParts.length - 1];
                formData.append("profileImage", {
                    uri: selectedImage,
                    name: `photo.${fileType}`,
                    type: `image/${fileType}`,
                });
            }

            const resultOK = await uploadProfile(formData); // Awaiting the result
            if (!resultOK) {
                throw new Error("Bad result from server");
            }
            Alert.alert(
                "Profile Uploaded",
                "Your profile has been uploaded successfully."
            );
            setProfile(defaultProfile);
            router.back();
        } catch (error) {
            console.error("Error uploading profile:", error);
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
                "Permission Denied",
                "You've refused to allow this app to access your photos!"
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            const uri = result.assets[0].uri; // Extract URI from the assets array
            setProfile({ ...profile, profileImage: uri });
            setSelectedImage(uri);
        }
    };

    return (
        <ImageBackground source={Background} style={styles.background}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.image}>
                    <Image
                        style={styles.userImg}
                        source={{
                            uri: profile.profileImage
                                ? profile.profileImage
                                : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
                        }}
                    />
                    <TouchableOpacity onPress={pickImage}>
                        <Text style={styles.editText}>Edit profile image</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.box}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your username"
                            value={profile.username}
                            onChangeText={(text) => handleInputChange("username", text)}
                        />
                    </View>
                    <View style={styles.box}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your bio"
                            value={profile.bio}
                            onChangeText={(text) => handleInputChange("bio", text)}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.uploadButton, { backgroundColor: "#fffacd" }]}
                    onPress={handleUploadProfile}
                >
                    <Text style={styles.uploadButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.uploadButton, { backgroundColor: "#F1FBFD" }]}
                    onPress={() => router.back()}
                >
                    <Text style={styles.uploadButtonText}>Back</Text>
                </TouchableOpacity>
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
    image: {
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
        justifyContent: "center",
        flexDirection: "row",
    },
    uploadButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 30,
        borderRadius: 5,
    },
    uploadButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
});
