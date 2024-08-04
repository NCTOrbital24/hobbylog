import {
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { StyleSheet } from "react-native";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
    return (
        <MaterialTopTabs
            initialRouteName="FriendSearch"
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: "#3c3c3c",
                tabBarIndicatorStyle: { backgroundColor: "#8B8000" },
            }}
        >
            <MaterialTopTabs.Screen
                name="FriendSearch"
                options={{ title: "Friends" }}
            />
            <MaterialTopTabs.Screen
                name="HobbySearch"
                options={{
                    title: "Hobbies",
                }}
            />
            <MaterialTopTabs.Screen
                name="UserSearch"
                options={{ title: "Users" }}
            />
        </MaterialTopTabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "#FFFDD0",
    },
});
