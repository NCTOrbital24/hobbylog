import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";

//! THIS IS A COMPONENT WHICH MAY OR MAY NOT BE USED.
//! IT IS MEANT TO RENDER FRIENDS :) IN THE COMMUNITY SCREEN

export default function FriendSearchCard({ info }) {
    const navigateToUserPage = (user) => { };

    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>This is a card for a friend search result!</Text>
        </View>
    );
}
