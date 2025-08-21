import { Stack } from "expo-router";

export default function BeverageLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{title: "Beverages"}}/>
            <Stack.Screen
                name="addBeverageSize"
                
                options={{
                    title: "Add Beverage Size",
                    presentation: 'modal',
                }}
            />
        </Stack>
    );
}