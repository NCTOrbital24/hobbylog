import {
    FontAwesome,
    Octicons,
    Feather,
    AntDesign,
    FontAwesome6,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: "#3c3c3c",
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="HomeScreen"
                options={{
                    href: "/HomeScreen",
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="home" color={color} />
                    ),
                    
                }}
            />
            <Tabs.Screen
                name="HobbyScreen"
                options={{
                    href: "/HobbyScreen",
                    title: "Hobbies",
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="smileo" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="CreateHobbyScreen"
                options={{
                    href: "/create/CreateHobbyScreen",
                    title: "Create",
                    tabBarIcon: ({ color }) => (
                        <Feather name="plus" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="CommunityScreen"
                options={{
                    href: "/CommunityScreen",
                    title: "Community",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6
                            name="people-pulling"
                            size={28}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="UserProfile"
                options={{
                    href: "/UserProfile",
                    title: "User",
                    tabBarIcon: ({ color }) => (
                        <Octicons size={28} name="person" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "#FFFDD0",
    },
});