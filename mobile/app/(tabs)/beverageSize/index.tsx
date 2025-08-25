import { ScrollView, StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native';
import { useRouter} from 'expo-router';
import { Size } from '@/constants/common';
import { Colors } from '@/constants/Colors';
import useGetBeverageSizes from '@/queries/useGetBeverageSizes';
import Header from '@/components/ui/Header';
import useDeleteBeverageSize from '@/queries/useDeleteBeverageSize';
import ListItem from '@/components/ListItem';

export default function BeverageSizesScreen() {
    const router = useRouter();
    const {data: beverageSizes} = useGetBeverageSizes();
    const deleteBeverageSizeMutation = useDeleteBeverageSize();
   
    const onDelete = async (id: string) => {
        await deleteBeverageSizeMutation.mutateAsync({id});
    }

    const onEdit = async (id: string) => {
      router.push( {
          pathname: "/beverageSize/addBeverageSize",
          params: { id }
      });
    }

    const renderBeverageSizeItem = (item: any) => {
      return(<ListItem itemId={item._id} onDelete={onDelete} onEdit={onEdit}>
        <Text style={styles.sizeItem}>{`${item?.size} - $${item.price}`}</Text>     
      </ListItem>);
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
