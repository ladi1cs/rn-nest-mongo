import { ScrollView, StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native';
import { useRouter} from 'expo-router';
import { Size } from '@/constants/common';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import useGetBeverageSizes from '@/queries/useGetBeverageSizes';
import Header from '@/components/ui/Header';
import useDeleteBeverageSize from '@/queries/useDeleteBeverageSize';

export default function BeverageSizesScreen() {
    const router = useRouter();
    const {data: beverageSizes} = useGetBeverageSizes();
    const deleteBeverageSizeMutation = useDeleteBeverageSize();
   
    const onDelete = async (id: string) => {
        console.log("onDelete", {id})
        await deleteBeverageSizeMutation.mutateAsync({id});
    }

    const renderBeverageSizeItem = (item: any) => {
       return(<View style={styles.itemContainer}>
            <Text style={styles.sizeItem}>{`${item?.size} - $${item.price}`}</Text>
            <TouchableOpacity onPress={() => onDelete(item._id)}>
                <MaterialIcons name="highlight-remove" size={24} color={Colors.common.error} />
            </TouchableOpacity>           
        </View>);
    }

    return (
        <>
            <Header title="List of Beverage Sizes" onAddClick={()=>router.navigate("/beverageSize/addBeverageSize")}/>
            <ScrollView>
                <FlatList 
                    data={beverageSizes}
                    renderItem={({item}) => renderBeverageSizeItem(item)}
                />        
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent:'space-between',
    borderBottomWidth: 1,
    borderColor: 'white'
  },
  item: {
    fontSize: Size.font.medium,
    height: 25,
    backgroundColor: Colors.common.none
  },
  sizeItem: {
    fontSize:  Size.font.small,
    height: 25,
    backgroundColor: Colors.common.none
  },
});
