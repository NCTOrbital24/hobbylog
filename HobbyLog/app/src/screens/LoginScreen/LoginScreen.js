import React, { useState } from "react";
import {
    View,
    ScrollView,
    Image,
    StyleSheet,
    useWindowDimensions,
    ImageBackground,
    Text,
} from "react-native";
import Logo from "#/assets/images/Logo_1.png";
import CustomInput from "#/components/CustomInput";
import CustomButton from "#/components/CustomButton";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

import CallLogin from '#/functions/CallLogin';

import Background from "#/assets/images/defaultBackground.png";

/*
    TODO: AUTO-LOGIN IF PREVIOUSLY LOGGED IN
    const savedEmail = SecureStore.getItemAsync("email");
    const savedPassword = SecureStore.getItemAsync("password");

*/

export default function LoginScreen({ registrationSuccess = false }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { height, width } = useWindowDimensions();
    const [emailNotFilled, displayNoEmailWarning] = useState(false);
    const [passwordTooShort, displayShortPasswordWarning] = useState(false);
    const [loginFail, displayLoginFail] = useState(false);

    const onSignInPressed = () => {
        displayLoginFail(false);
        const response = CallLogin(email, password);
        response.then((response) => {
            if (response.status === 200) {
                SecureStore.setItemAsync("email", email);
                SecureStore.setItemAsync("password", password);
                router.replace("../HomeScreen/HomeScreen");
            } else {
                displayLoginFail(true);
            }
        });
    };
    const onForgotPasswordPressed = () => {
        router.replace("../ForgotPasswordScreen/ForgotPasswordScreen");
    };
    const onSignUpPressed = () => {
        router.replace("../SignUpScreen/SignUpScreen");
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground
                source={Background}
                style={[styles.bgImage, { width: width }, { height: height }]}
            >
                <View style={[styles.root, { width: width * 0.7 }]}>
                    <Image
                        source={Logo}
                        style={[
                            styles.logo,
                            { height: height * 0.3 },
                            { width: width * 0.7 },
                        ]}
                        resizeMode="contain"
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
                    />

                    <CustomButton
                        text="Sign In!"
                        onPress={() => {
                            displayNoEmailWarning(email === "");
                            displayShortPasswordWarning(password.length <= 6);
                            if (!emailNotFilled && password.length > 6) {
                                onSignInPressed();
                            }
                        }}
                    />

                    <View>
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
                        {loginFail && (
                            <Text style={styles.warning}>Login failed!</Text>
                        )}
                        {registrationSuccess && (
                            <Text style={styles.warning}>
                                Registration Successful!
                            </Text>
                        )}
                    </View>

                    <CustomButton
                        text="Forgot password?"
                        onPress={onForgotPasswordPressed}
                        type="TERTIARY"
                    />

                    <CustomButton
                        text="Don't have an account? Create one"
                        onPress={onSignUpPressed}
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
        justifyContent: "center",
    },
    logo: {
        maxWidth: 300,
        maxHeight: 200,
    },
    warning: {},
});
