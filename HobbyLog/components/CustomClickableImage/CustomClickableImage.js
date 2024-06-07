import React from "react";
import { Pressable, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";


export default function CustomClickableImage({ onPress, path, size }) {
    const styles = StyleSheet.create({
        container: {
            width: size,
            height: size,
            borderRadius: size / 2,
            padding: 10,
            marginVertical: 5,
            alignItems: "center",
        },
        image: {
            height: size/2,
            aspectRatio: 1,
            resizeMode: "contain",
        }
    });
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Image style={styles.image} source={path} />
        </Pressable>
    );
}
