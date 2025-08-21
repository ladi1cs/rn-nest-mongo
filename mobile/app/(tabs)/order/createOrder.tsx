
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Dropdown, { DropdownItem } from '@/components/ui/Dropdow';
import useGetBeverageSizes from '@/queries/useGetBeverageSizes';
import List from '@/components/ui/List';
import useAddBeverage from '@/queries/useAddBeverage';

export default function CreateOrder() {

  const [name, setName] = useState('');
  const [selectedItems, setSelectedItems] = useState<DropdownItem[]>([]);
  const {data: beverageSizes} = useGetBeverageSizes();
  const addBeverage = useAddBeverage();

  // const sizeOptions = useMemo(() => {
  //   const options = beverageSizes?.sort((a,b)=>{return a.price - b.price})
  //   .map((sz: any) => { 
  //     return {value: sz._id, label: `${sz?.size} - $${sz.price}`}
  //   });

  //   return options.sort();
  // },[beverageSizes])

  const onSave = async () => {
    const newBeverage = {
      name,
      sizes: selectedItems.map(i => i.value)
    }
     await addBeverage.mutateAsync(newBeverage);
    router.back();
  }

  return (
//     <>
//     <Header title="List of Beverages" onAddClick={()=>router.navigate("/beverage/addBeverage")}/>
//     <ScrollView>
//         <FlatList 
//             data={beverages}
//             renderItem={({item}) => renderBeverageItem(item)}
//         />        
//     </ScrollView>
// </>
    <View style={styles.container}>
      <Input text={name} label="Customer Name" onChange={(txt) => setName(txt)}/>
      <Input text={name} label="Contact Info" onChange={(txt) => setName(txt)}/>
      {/* <Dropdown 
        label='Beverage Size' 
        data={sizeOptions} 
        onSelect={(item: DropdownItem) => setSelectedItems([...selectedItems, item])}/> */}
      <List data={selectedItems.map(i => i.label)} label='Selected Sizes'/>
      <View style={styles.buttons}>
        <Button title='Save' type="success" onPress={onSave}/>
        <Button title='Cancel' onPress={()=> router.back()}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
    paddingTop: 100, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',    
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
