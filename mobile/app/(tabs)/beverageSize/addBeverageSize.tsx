
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import useAddBeverageSize from '@/queries/useAddBeverageSize';

export default function AddBeverageSize() {

  const [sizeName, setSizeName] = useState<string>('');
  const [sizePrice, setSizePrice] = useState<string>('0');
  const addBeverageSize = useAddBeverageSize();

  const onSave = async () => {
    const newBeverageSize = {
      size: sizeName,
      price: sizePrice
    }
    await addBeverageSize.mutateAsync(newBeverageSize);
    router.back();
  }

  return (
    <View style={styles.container}>
      <Input text={sizeName} label="Beverage Size Name" onChange={(txt) => setSizeName(txt)}/>
      <Input text={sizePrice} label="Beverage Price" onChange={(txt) => setSizePrice(txt)}/>
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
