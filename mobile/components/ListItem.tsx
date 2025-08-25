import { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Size } from '@/constants/common';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Colors } from '@/constants/Colors';


interface ListItemProps {
    itemId: string;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    children: ReactNode;
}
export default function ListItem(props: ListItemProps) {
    const { itemId, onEdit, onDelete, children} = props;  

    return(<View style={styles.itemContainer}>
            {children}
            <View style={styles.icons}>
                { onEdit && <TouchableOpacity onPress={() => onEdit(itemId)}>
                    <FontAwesome5 name="edit" size={ Size.icon.large } color={Colors.common.frame} />
                </TouchableOpacity> }     
                { onDelete && <TouchableOpacity onPress={() => onDelete(itemId)}>
                    <MaterialIcons name="highlight-remove" size={ Size.icon.large } color={Colors.common.error} />
                </TouchableOpacity> }         
            </View>
        </View>);
}

const styles = StyleSheet.create({

  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent:'space-between',
    borderBottomWidth: 1,
    borderColor: 'white'
  },
  icons: {
    flexDirection: 'row',
    width: 80,
    justifyContent: "space-between",
    paddingRight: 10,
  },
});
