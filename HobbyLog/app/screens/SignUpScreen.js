import React, { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    useWindowDimensions,
    ImageBackground,
} from "react-native";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { backendLink } from "@/constants/constants";
import Background from "@/assets/images/defaultBackground.png";

const signUpLink = backendLink + "/api/auth/register";

export default function SignUpScreen() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [emailNotFilled, displayNoEmailWarning] = useState(false);
    const [usernameNotFilled, displayNoUsernameWarning] = useState(false);
    const [passwordTooShort, displayShortPasswordWarning] = useState(false);
    const [passwordMismatch, displayPasswordMismatch] = useState(false);
    const [emailAlreadyTaken, displayEmailAlreadyTaken] = useState(false);
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
                    router.replace({
                        pathname: "./LoginScreen",
                        params: { registrationSuccess: true },
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
