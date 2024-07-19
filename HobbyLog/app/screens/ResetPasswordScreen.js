import React, { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    useWindowDimensions,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

//Might remove the code and shift it to another screen

export default function ResetPasswordScreen() {
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { width, height } = useWindowDimensions();
    const onSubmitPressed = () => {
        console.warn("sign up");
    };

    const onSignInPressed = () => {
        router.navigate("/LoginScreen");
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.root, { width: width * 0.9 }]}>
                <Text style={styles.title}>Reset your password</Text>
                <CustomInput
                    placeholder={"Enter your code"}
                    value={code}
                    setValue={setCode}
                />

                <CustomInput
                    placeholder={"Enter your new password"}
                    value={newPassword}
                    setValue={setNewPassword}
                />

                <CustomButton text="Submit" onPress={onSubmitPressed} />

                <CustomButton
                    text="Back to Sign in"
                    onPress={onSignInPressed}
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
    },
});
