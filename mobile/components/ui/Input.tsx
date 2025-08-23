import { StyleSheet, TextInput } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";

interface InputProps {
    text: string;
    label?: string;
    onChange: (txt: string) => void;
}
export default function Input(props: InputProps) {
    const { text, label, onChange } = props;
      
    return (
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="default">{label}</ThemedText>
            <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={text}
            /> 
        </ThemedView> 
    );
}

const styles = StyleSheet.create({
    titleContainer: {
      width: '80%',
      paddingVertical: 10,
      alignContent: 'center',
      justifyContent:'center',
      backgroundColor: 'transparent'
    },
    input: {
        height: 45, 
        width: '100%', 
        paddingHorizontal: 8,
        borderRadius: 7,
        borderColor: Colors.common.frame, 
        borderWidth: 1, 
        backgroundColor: Colors.common.background,
    },
});