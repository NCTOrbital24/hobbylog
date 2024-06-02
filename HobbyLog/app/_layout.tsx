import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

function RootLayout() {
    return (
        <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="src/screens/HomeScreen/HomeScreen" />
                <Stack.Screen name="src/screens/LoginScreen/LoginScreen" />
                <Stack.Screen name="src/screens/SignUpScreen/SignUpScreen" />
                <Stack.Screen name="src/screens/ForgotPasswordScreen/ForgotPasswordScreen" />
            </Stack>
        </SafeAreaProvider>
    );
}
