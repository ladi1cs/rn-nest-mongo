import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Size } from "@/constants/common";

interface HeaderProps {
    title: string;
    onAddClick?: () => void;
}
export default function Header(props: HeaderProps) {
    const { title, onAddClick } = props;

     return (
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">{title}</ThemedText>
            {onAddClick && 
            <TouchableOpacity style={{paddingLeft: 50}} onPress={onAddClick}>
                <FontAwesome5 name="plus" size={Size.icon.large} color={Colors.common.default} />
            </TouchableOpacity>
            }  
        </ThemedView> 
    );
}

const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      padding: 20,
      borderBottomWidth: 2,
      alignContent: 'center',
      justifyContent:'center',
      backgroundColor: 'transparent'
    },
});