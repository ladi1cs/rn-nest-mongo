
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Dropdown, { DropdownItem } from '@/components/ui/Dropdow';
import List from '@/components/ui/List';
import { toMap } from '@/utils/utils'
import { 
  useAddBeverage, 
  useGetBeverageSizes,
  useGetBeverage,
  useUpdateBeverage
} from '@/queries';

export default function AddBeverage() {

  const [name, setName] = useState('');
  const [selectedItems, setSelectedItems] = useState<DropdownItem[]>([]);
  const {data: beverageSizes} = useGetBeverageSizes();
  const { id: beverageId } = useLocalSearchParams();
  const addBeverage = useAddBeverage();
  const updateBeverage = useUpdateBeverage(beverageId);
  const {data: selectedBeverage} = useGetBeverage(beverageId);
  
  
  useEffect(() => {
    if(selectedBeverage) {
      setName(selectedBeverage.name);

      const selectedOptions = beverageSizes
      .filter(bs => selectedBeverage.sizes?.includes(bs._id))
      .map((sz: any) => { 
        return {value: sz._id, label: `${sz?.size} - $${sz.price}`}
      });

      setSelectedItems(selectedOptions);
    }
  }, [selectedBeverage])
  

  const sizeOptions = useMemo(() => {
    if (!beverageSizes) {
      return [];
    }

    const options = beverageSizes
    .sort((a,b)=>{return a.price - b.price})
    .map((sz: any) => { 
      return {value: sz._id, label: `${sz?.size} - $${sz.price}`}
    });

    return options;
  },[beverageSizes])

  const onSave = async () => {
    const newBeverage = {
      name,
      sizes: selectedItems.map(i => i.value)
    }
    
    if( selectedBeverage ) {
      await updateBeverage.mutateAsync(newBeverage);
    }
    else {
      await addBeverage.mutateAsync(newBeverage);
    }

    router.back();
  }

  return (
    <View style={styles.container}>
      <Input text={name} label="Beverage Name" onChange={(txt) => setName(txt)}/>
      <Dropdown 
        label='Beverage Size' 
        data={sizeOptions} 
        onSelect={(item: DropdownItem) => setSelectedItems([...selectedItems, item])}/>
      <List data={selectedItems.map(i => i.label)} label='Selected Sizes'/>
      <View style={styles.buttons}>
        <Button title={selectedBeverage ? 'Update' : 'Save'} type="success" onPress={onSave}/>
        <Button title='Cancel' onPress={()=> router.back()}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
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
