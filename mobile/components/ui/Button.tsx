import { Colors } from "@/constants/Colors";
import { Size } from "@/constants/common";
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export type ButtonType = 'default' | 'submit' | 'success' | 'fail';
export type ButtonSize = 'small' | 'medium' | 'large';

const bgColorMap = {
    default: Colors.common.frame, 
    submit: Colors.common.button,
    success: Colors.common.success,
    fail: Colors.common.error
}

const btnSizeMap = {
    small: {
        height: 30,
        padding: 5,
        fontSize: Size.font.small
    },
    medium: {
        height: 40,
        padding: 7,
        fontSize: Size.font.medium
    },
    large: {
        height: 50,
        padding: 10,
        fontSize: Size.font.large
    }
}

interface ButtonProps {
    title: string;
    width?: number;
    type?: ButtonType;
    size?: ButtonSize;
    onPress: () => void;
}

export default function Button(props: ButtonProps) {
    const { title, width, onPress, type = "default", size = 'large' } = props;

    const styles = getStyles({width, type, size})
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
        height: btnSizeMap[props.size]?.height,
        backgroundColor: bgColorMap[props.type],
        paddingVertical: btnSizeMap[props.size]?.padding,
        paddingHorizontal: btnSizeMap[props.size]?.padding * 2,
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
        fontSize: btnSizeMap[props.size]?.fontSize,
        fontWeight: "600",
    },
});
