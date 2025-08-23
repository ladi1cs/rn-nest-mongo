import { Stack } from "expo-router";
import { View } from "react-native";

export default function OrderLayout() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="createOrder"                
                options={{
                    title: "Order Beverages",
                    headerBackTitle: "",
                    presentation: 'modal',
                    headerShown: false
                    
                }}
            />
        </Stack>
    );
}