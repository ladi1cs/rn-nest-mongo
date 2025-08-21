import { Stack } from "expo-router";

export default function OrderLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="createOrder"
                
                options={{
                    title: "Order Beverages",
                    presentation: 'modal',
                }}
            />
        </Stack>
    );
}