import React, { useState } from "react";
import {
    View,
    Text
} from "react-native";
import { backendLink } from '../../constants/constants';

export default function ExpressTest() {
    fetch(backendLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
    return (
        <View>
            <Text>ping?</Text>
        </View>
    )
}