import { ScrollView, StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { useRouter} from 'expo-router';
import useGetBeverages from '@/queries/useGetBeverages';
import { Size } from '@/constants/common';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import useDeleteBeverages from '@/queries/useDeleteBeverage';
import useGetBeverageSizes from '@/queries/useGetBeverageSizes';
import { useMemo } from 'react';
import Header from '@/components/ui/Header';

export default function TabTwoScreen() {
    const router = useRouter();
    const {data: beverages} = useGetBeverages();
    const {data: beverageSizes} = useGetBeverageSizes();
    const deleteBeveragesMutation = useDeleteBeverages();
    
    const sizesMap = useMemo(() => {
        const map = beverageSizes?.reduce((acc: any, sz: any) => {
            console.log("sizesMap", {sz, acc})
            acc[sz._id] = {size: sz.size, price: sz.price};
            return acc;
        },{});

        return map;

    },[beverageSizes])

    const onDelete = async (id: string) => {
        await deleteBeveragesMutation.mutateAsync({id});
    }

    const renderBeverageSizeItem = (item: any) => {
        const sz = sizesMap[item]
        if(!sz) {
            return null;
        }
        return <Text style={styles.sizeItem}>{`${sz?.size} - $${sz.price}`}</Text>
    }

    const renderSizes = (bev: any) => {
        if(!bev?.sizes?.length){
            return <Text style={styles.sizeItem}>One size</Text>
        }
        return(<View >
            <FlatList 
                data={bev?.sizes}
                renderItem={({item}) => renderBeverageSizeItem(item)}
            />
        </View>);
    }

    const renderBeverageItem = (item: any) => {
       return(<View style={styles.itemContainer}>
            <Collapsible title={item.name} bgColor={Colors.common.none}>
                {renderSizes(item)}
            </Collapsible>
            <TouchableOpacity onPress={() => onDelete(item._id)}>
                <MaterialIcons name="highlight-remove" size={24} color={Colors.common.error} />
            </TouchableOpacity>           
        </View>);
    }

    return (
        <>
            <Header title="List of Beverages" onAddClick={()=>router.navigate("/beverage/addBeverage")}/>
            <ScrollView>
                <FlatList 
                    data={beverages}
                    renderItem={({item}) => renderBeverageItem(item)}
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
