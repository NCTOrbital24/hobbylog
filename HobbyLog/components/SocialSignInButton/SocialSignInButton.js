import React from "react";
import { View } from "react-native";
import CustomButton from "../CustomButton";

export default function SocialSignInButton() {
    const onSignInFacebook = () => {
        console.warn("forgot password");
    };
    const onSignInGoogle = () => {
        console.warn("forgot password");
    };
    const onSignInApple = () => {
        console.warn("forgot password");
    };
    return (
        <>
            <CustomButton
                text="Sign in with Facebook"
                onPress={onSignInFacebook}
                bgColor="#E7EAF4"
                fgColor="blue"
            />
            <CustomButton
                text="Sign in with Google"
                onPress={onSignInGoogle}
                bgColor="#FAE9EA"
                fgColor="red"
            />
            <CustomButton
                text="Sign in with Apple"
                onPress={onSignInApple}
                bgColor="#e3e3e3"
                fgColor="grey"
            />
        </>
    );
}
