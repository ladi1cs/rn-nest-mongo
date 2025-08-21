import { Colors } from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemedText } from '../ThemedText';

export interface DropdownItem {
    label: string;
    value: string;
}

interface DropdownProps {
    label?: string;
    data: DropdownItem[];
    placeholder?: string;
    onSelect?: (option?: DropdownItem) => void;
}

export default function Dropdown(props: DropdownProps) {
    const { data, label, onSelect, placeholder = "Select an option" } = props;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
          setItems(data.map(v => ({ label: v.label, value: v.value })));
        }
    }, [data]);
    
    return (
        <View style={styles.container}>
            <ThemedText type="default">{label}</ThemedText>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onSelectItem={(items)=> onSelect(items as DropdownItem)}
                placeholder={placeholder}
                listMode="SCROLLVIEW"
                style={styles.dropdown}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        paddingVertical: 20,
        alignContent: 'center',
        justifyContent:'center',
        backgroundColor: 'transparent'
      },
      dropdown: {
        borderColor: Colors.common.frame,
      },
});