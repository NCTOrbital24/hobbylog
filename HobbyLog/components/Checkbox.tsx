import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Checkbox({
    value,
    onValueChange,
    style,
    size,
    color,
}: {
    value: boolean;
    onValueChange: any;
    style: any;
    size: number;
    color: string;
    }) {
    return (
        <TouchableOpacity onPress={() => onValueChange(value)} style={style}>
            {!value ?
                (<Feather name="circle" size={size} color={color} />) :
                (<Feather name="check-circle" size={size} color={color} />)}
        </TouchableOpacity>
    );
}

