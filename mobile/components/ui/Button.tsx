import { Colors } from "@/constants/Colors";
import { Size } from "@/constants/common";
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export type ButtonType = 'default' | 'submit' | 'success' | 'fail';

const bgColorMap = {
    default: Colors.common.frame, 
    submit: Colors.common.button,
    success: Colors.common.success,
    fail: Colors.common.error
}

interface ButtonProps {
    title: string;
    width?: number;
    type?: ButtonType;
    onPress: () => void;
}

export default function Button(props: ButtonProps) {
    const { title, width, onPress, type = "default" } = props;

    const styles = getStyles({width, type})
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={onPress}
            >
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const getStyles = (props: any) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: props.width,
        backgroundColor: bgColorMap[props.type],
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5, 
    },
    text: {
        color: Colors.common.background,
        fontSize: Size.font.small,
        fontWeight: "600",
    },
});
