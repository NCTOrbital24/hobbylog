import { Stack } from "expo-router/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="EditHobbyPage" options={{ headerShown: false }} />
                <Stack.Screen name="screens/LoginScreen" />
                <Stack.Screen name="screens/SignUpScreen" />
                <Stack.Screen name="screens/ForgotPasswordScreen" />
                <Stack.Screen name="screens/ResetPasswordScreen" />
            </Stack>
        </SafeAreaProvider>
    );
}
