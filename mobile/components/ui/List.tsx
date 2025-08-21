
import { FlatList, StyleSheet, Text } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";

interface ListProps {
    data: string[];
    label?: string;
}
export default function List(props: ListProps) {
    const { data, label } = props;
    
    return (
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="default">{label}</ThemedText>
             <FlatList 
                style={styles.list}
                data={data}
                renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
            />
        </ThemedView> 
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        width: '80%',
        paddingVertical: 20,
        alignContent: 'center',
        justifyContent:'center',
        backgroundColor: Colors.common.none
    },
    list: {
        flexDirection: 'row',
        height: 200,
        borderWidth: 1,
        borderColor: Colors.common.frame,
        backgroundColor: Colors.common.background
    },
    item: {
        flexDirection: 'row',
        padding: 10,
        justifyContent:'space-between',
        borderBottomWidth: 1,
        borderColor: Colors.common.background
    },
});