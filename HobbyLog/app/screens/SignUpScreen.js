import React, { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    useWindowDimensions,
    ImageBackground,
    Modal,
    TouchableOpacity,
} from "react-native";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { backendLink } from "@/constants/constants";
import Background from "@/assets/images/defaultBackground.png";
import CallLogin from "@/functions/CallLogin";
import * as SecureStore from "expo-secure-store";

export default function SignUpScreen() {
    const signUpLink = backendLink + "/api/auth/register";
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [emailNotFilled, displayNoEmailWarning] = useState(false);
    const [usernameNotFilled, displayNoUsernameWarning] = useState(false);
    const [passwordTooShort, displayShortPasswordWarning] = useState(false);
    const [passwordMismatch, displayPasswordMismatch] = useState(false);
    const [emailAlreadyTaken, displayEmailAlreadyTaken] = useState(false);
    //const [succModal, showSuccModal] = useState(false);
    const { width, height } = useWindowDimensions();
    function clearAllWarnings() {
        displayEmailAlreadyTaken(false);
        displayNoEmailWarning(false);
        displayNoUsernameWarning(false);
        displayPasswordMismatch(false);
        displayShortPasswordWarning(false);
    }
    const onRegisterPressed = () => {
        clearAllWarnings();
        if (username === "") {
            displayNoUsernameWarning(true);
        } else if (email === "") {
            displayNoEmailWarning(true);
            return;
        } else if (password.length <= 6) {
            displayShortPasswordWarning(true);
            return;
        } else if (password !== passwordRepeat) {
            displayPasswordMismatch(true);
            return;
        } else {
            const response = fetch(signUpLink, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: username,
                }),
            }).catch((error) => {
                console.error(
                    "There was a problem with the register operation:",
                    error
                );
            });

            response.then((response) => {
                if (response.status === 400) {
                    displayEmailAlreadyTaken(true);
                } else if (response.status === 201) {
                    const loginResponse = CallLogin(email, password);
                    loginResponse.then(async (response) => {
                        const data = await response.json();
                        if (response.ok && data.username) {
                            SecureStore.setItemAsync("email", email);
                            SecureStore.setItemAsync("password", password);
                            //ping server for username and get it
                            SecureStore.setItemAsync("username", data.username);
                            SecureStore.setItemAsync("id", data.id);
                            router.dismissAll();
                            router.replace("../(tabs)/HomeScreen");
                        } else {
                            console.log(response.ok);
                            console.log(data.username);
                        }
                    });
                }
            });
        }
    };
    const onTermsOfUsedPressed = () => {};
    const onPrivacyPolicyPressed = () => {};
    const onSignInPressed = () => {
        router.navigate("./LoginScreen");
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground
                source={Background}
                style={[styles.bgImage, { width: width }, { height: height }]}
            >
                <View style={[styles.root, { width: width * 0.7 }]}>
                    <Text style={styles.title}>Create an account</Text>
                    <CustomInput
                        placeholder={"Username"}
                        value={username}
                        setValue={setUsername}
                        maxLength={16}
                    />
                    <CustomInput
                        placeholder={"Email"}
                        value={email}
                        setValue={setEmail}
                    />
                    <CustomInput
                        placeholder={"Password"}
                        value={password}
                        setValue={setPassword}
                        isSecure={true}
                        maxLength={32}
                    />
                    <CustomInput
                        placeholder={"Confirm Password"}
                        value={passwordRepeat}
                        setValue={setPasswordRepeat}
                        isSecure={true}
                        maxLength={32}
                    />

                    <CustomButton text="Register" onPress={onRegisterPressed} />

                    <View>
                        {usernameNotFilled && (
                            <Text style={styles.warning}>
                                Please fill in a username!
                            </Text>
                        )}
                        {emailNotFilled && (
                            <Text style={styles.warning}>
                                Please fill in an email!
                            </Text>
                        )}
                        {passwordTooShort && (
                            <Text style={styles.warning}>
                                Password should be longer!
                            </Text>
                        )}
                        {emailAlreadyTaken && (
                            <Text style={styles.warning}>
                                Email Already Taken!
                            </Text>
                        )}
                        {passwordMismatch && (
                            <Text style={styles.warning}>
                                Passwords do not match!
                            </Text>
                        )}
                    </View>

                    <Text style={styles.text}>
                        By registering, you accept our{" "}
                        <Text
                            style={styles.link}
                            onPress={onTermsOfUsedPressed}
                        >
                            Terms of Use
                        </Text>{" "}
                        and{" "}
                        <Text
                            style={styles.link}
                            onPress={onPrivacyPolicyPressed}
                        >
                            Privacy Policy
                        </Text>
                        .
                    </Text>

                    <CustomButton
                        text="Have an account? Sign in"
                        onPress={onSignInPressed}
                        type="TERTIARY"
                    />
                </View>
                {/*
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={succModal}
                    onRequestClose={() =>
                        router.replace({
                            pathname: "./LoginScreen",
                            params: { registrationSuccess: true },
                        })
                    }
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        <View
                            style={{
                                width: "80%",
                                height: "20%",
                                backgroundColor: "#FFFDD0",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 25,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    router.replace({
                                        pathname: "./LoginScreen",
                                        params: { registrationSuccess: true },
                                    })
                                }
                            >
                                <Text style={{color: "black", fontWeight: "bold"}}>
                                    Registration Sucessful! Click to go
                                    back!
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                */}
            </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    bgImage: {
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    root: {
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#051C50",
        margin: 10,
    },
    text: {
        color: "gray",
        marginVertical: "10",
    },
    link: {
        color: "FDB075",
        fontWeight: "bold",
    },
});
