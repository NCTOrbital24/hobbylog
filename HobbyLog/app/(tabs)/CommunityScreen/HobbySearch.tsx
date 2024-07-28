import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    Text,
    FlatList,
    TextInput,
} from "react-native";
import Background from "@/assets/images/defaultBackground.png";
import { AntDesign } from "@expo/vector-icons";
import HobbySearchCard from "@/components/CommunityScreen/HobbySearchCard";
import { backendLink } from "@/constants/constants";
import fetchHobbies from "@/functions/FetchHobbies";

export default function HobbySearch() {
    const testHobby = {
        _id: "hey",
        name: "hobbyName",
        description: "hobbyDescription",
        icon: "hobbyIcon",
        owner: "hobbyOwner",
        goalsLength: 1,
        tasksLength: 1,
    };
    const testHobbyArray = [];
    //! RUDIMENTARY TEST TO MAKE SURE CARDS ARE RENDERING.

    const [searchText, setSearchText] = useState("");
    const [hobbyArray, setHobbyArray] = useState<Array<any>>(testHobbyArray);
    // * ARRAY THAT IS CHANGED WHEN SEARCHED, AND THEN RENDERED

    const renderHobbySearchResult = (hobbyInfo) => (
        <HobbySearchCard hobbyInfo={hobbyInfo} />
    );

    const searchHobbies = useCallback(async () => {
        if (searchText === "") {
            setHobbyArray([]);
        } else {
            try {
                const response = await fetch(
                    `${backendLink}/api/search/hobbies?search=${encodeURIComponent(
                        searchText
                    )}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch hobbies");
                }
                const data = await response.json();
                setHobbyArray(data);
            } catch (err) {
                console.error(err.message);
            }
        }
    }, [searchText]);

    useEffect(() => {
        searchHobbies();
    }, [searchText, searchHobbies]);

    return (
        <ImageBackground source={Background} style={styles.background}>
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.searchBar}>
                    <AntDesign
                        name="search1"
                        size={24}
                        color="black"
                        style={{ marginTop: 3, marginRight: 4 }}
                    />
                    <TextInput
                        style={styles.searchText}
                        onChangeText={(text) => {
                            setSearchText(text);
                            searchHobbies();
                        }}
                        placeholder="Search for a hobby..."
                        value={searchText}
                    />
                </View>
                <View style={styles.line}></View>
                <View style={styles.body}>
                    {hobbyArray.length === 0 ? (
                        <Text>No hobbies found</Text>
                    ) : (
                        <FlatList
                            data={hobbyArray}
                            renderItem={({ item }) =>
                                renderHobbySearchResult(item)
                            }
                            keyExtractor={(item) => item._id}
                        />
                    )}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        height: "100%",
    },
    background: {
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    searchBar: {
        paddingHorizontal: 12,
        paddingTop: 12,
        flexDirection: "row",
    },
    searchText: {
        fontSize: 21,
    },
    line: {
        borderWidth: 1,
        borderColor: "grey",
        width: "80%",
        alignSelf: "center",
    },
    body: {
        width: "90%",
        alignSelf: "center",
        maxHeight: "92%",
        marginTop: 10,
    },
});
