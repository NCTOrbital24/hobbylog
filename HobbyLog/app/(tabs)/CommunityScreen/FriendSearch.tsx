import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    FlatList,
    TextInput,
} from "react-native";
import Background from "@/assets/images/defaultBackground.png";
import { AntDesign } from "@expo/vector-icons";
import UserSearchCard from "@/components/CommunityScreen/UserSearchCard";

export default function FriendSearch() {
    const testFriend = {
        _id: "userid",
        name: "username",
        icon: "https://pbs.twimg.com/profile_images/1512898257902579717/sUi7n5Pi_400x400.jpg",
        isFriend: true,
    };
    const testFriendArray = [testFriend];
    //! RUDIMENTARY TEST TO MAKE SURE CARDS ARE RENDERING.

    const [searchText, setSearchText] = useState("");
    const [friendArray, setFriendArray] = useState<Array<any>>(testFriendArray);
    // * ARRAY THAT IS CHANGED WHEN SEARCHED, AND THEN RENDERED

    const renderFriendSearchResult = (userInfo) => (
        <UserSearchCard userInfo={userInfo} hideTick={true} />
    ); //? IS IT BETTER TO HAVE A FRIENDSEARHCARD?

    const handleFriendSearch = () => {
        console.log("searching for:", searchText);
    }; //TODO: HANDLE SEARCH LOL

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
                            handleFriendSearch();
                        }}
                        placeholder="Search for a friend!."
                        value={searchText}
                    />
                </View>
                <View style={styles.line}></View>
                <View style={styles.body}>
                    <FlatList
                        data={friendArray}
                        renderItem={({ item }) => 
                            renderFriendSearchResult(item)
                        }
                        keyExtractor={(item) => item._id}
                    />
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
