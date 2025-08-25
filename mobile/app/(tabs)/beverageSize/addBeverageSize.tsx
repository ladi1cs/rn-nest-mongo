
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { 
  useAddBeverageSize,
  useGetBeverageSize,
  useUpdateBeverageSize 
} from '@/queries';

export default function AddBeverageSize() {

  const [sizeName, setSizeName] = useState<string>('');
  const [sizePrice, setSizePrice] = useState<string>('0');
  const { id: sizeId } = useLocalSearchParams();
  const addBeverageSize = useAddBeverageSize();
  const updateBeverageSize = useUpdateBeverageSize(sizeId);
  const {data: selectedSize} = useGetBeverageSize(sizeId);
  
  useEffect(() => {
    if(selectedSize) {
      setSizeName(selectedSize.size);
      setSizePrice(String(selectedSize.price));
    }
  }, [selectedSize])
  
  const onSave = async () => {
    const newBeverageSize = {
      size: sizeName,
      price: sizePrice
    }

    if(sizeId) {
      await updateBeverageSize.mutateAsync(newBeverageSize);
    }
    else {
      await addBeverageSize.mutateAsync(newBeverageSize);
    }
    router.back();
  }

  return (
    <View style={styles.container}>
      <Input text={sizeName} label="Size Name" onChange={(txt) => setSizeName(txt)}/>
      <Input text={sizePrice} label="Price" onChange={(txt) => setSizePrice(txt)}/>
      <View style={styles.buttons}>
        <Button title={sizeId ? 'Update' : 'Save'} type="success" onPress={onSave}/>
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
