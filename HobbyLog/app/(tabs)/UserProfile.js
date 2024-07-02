import React, { useState, useEffect } from "react";
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
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Background from "@/assets/images/defaultBackground.png";
import { uploadProfile, fetchProfile } from './apiUser'; 

export default function UserProfile() {
    const [profile, setProfile] = useState({
        username: '',
        hobbies: '',
        bio: '',
        profileImage: 'https://6.soompi.io/wp-content/uploads/image/a7d15834c0204c7f9d0f04b0b5302acf/dummy.jpeg?s=900x600&e=t',
    });
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const result = await fetchProfile('Soon Chaewon');
                setProfile(result);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        loadProfile();
    }, []);

    const handleInputChange = (name, value) => {
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleUploadProfile = async () => {
        try {
            const formData = new FormData();
            formData.append('username', profile.username);
            formData.append('hobbies', profile.hobbies);
            formData.append('bio', profile.bio);
            if (selectedImage) {
                const uriParts = selectedImage.split('.');
                const fileType = uriParts[uriParts.length - 1];
                formData.append('profileImage', {
                    uri: selectedImage,
                    name: `photo.${fileType}`,
                    type: `image/${fileType}`,
                });
            }

            const result = await uploadProfile(formData);
            Alert.alert('Profile Uploaded', 'Your profile has been uploaded successfully.');
            console.log(result);
        } catch (error) {
            console.error('Error uploading profile:', error);
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission Denied", "You've refused to allow this app to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfile({ ...profile, profileImage: result.uri });
            setSelectedImage(result.uri);
        }
    };

    return (
        <ImageBackground source={Background} style={styles.background}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Image
                        style={styles.userImg}
                        source={{ uri: profile.profileImage }}
                    />
                    <Pressable onPress={pickImage}>
                        <Text style={styles.editText}>Edit profile image</Text>
                    </Pressable>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.box}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your username"
                            value={profile.username}
                            onChangeText={(text) => handleInputChange('username', text)}
                        />
                    </View>

                    <View style={styles.box}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your hobbies"
                            value={profile.hobbies}
                            onChangeText={(text) => handleInputChange('hobbies', text)}
                        />
                    </View>

                    <View style={styles.box}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your bio"
                            value={profile.bio}
                            onChangeText={(text) => handleInputChange('bio', text)}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={handleUploadProfile}
                >
                    <Text style={styles.uploadButtonText}>Upload Profile</Text>
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
        alignItems: 'center',
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
    editText: {
        fontSize: 16,
        textAlign: 'center',
        color: "#6495ed",
        marginTop: 10,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    box: {
        backgroundColor: '#fffacd',
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
        borderBottomColor: '#ccc',
        paddingBottom: 5,
    },
    buttonContainer: {
        width: "100%",
        position: 'absolute',
        bottom: 0,
        padding: 20,
        backgroundColor: 'transparent',
        alignItems: 'center',
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
