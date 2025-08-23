
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View, Text } from 'react-native';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Dropdown, { DropdownItem } from '@/components/ui/Dropdow';
import useGetBeverageSizes from '@/queries/useGetBeverageSizes';
import useGetBeverages from '@/queries/useGetBeverages';
import { ThemedText } from '@/components/ThemedText';
import List from '@/components/ui/List';
import { Colors } from '@/constants/Colors';
import useAddOrder from '@/queries/useAddOrder';

export interface OrderItem {
  beverageId: string,
  sizeId: string,
  quantity: number
}

const maxQuantity = 10;
const quantityOptions = (): DropdownItem[] => {
  return Array.from({ length: maxQuantity }, (_, i) => {
    const id = String(i + 1);
    const item: DropdownItem = { value: id, label: id };
    return item;
  });
}

export default function CreateOrder() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [selectedBeverage, setSelectedBeverage] = useState<DropdownItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<DropdownItem | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const { data: beverages } = useGetBeverages();
  const { data: beverageSizes } = useGetBeverageSizes();
  const addOrder = useAddOrder();

  const sizesMap = useMemo(() => {
    const map = beverageSizes?.reduce((acc: any, sz: any) => {
      acc[sz._id] = sz;
      return acc;
    }, {});
    return map;
  }, [beverageSizes])

  const beveragesMap = useMemo(() => {
    const map = beverages?.reduce((acc: any, bev: any) => {
      acc[bev._id] = bev;
      return acc;
    }, {});

    return map;
  }, [beverages])

  const beverageOptions = useMemo<DropdownItem[]>(() => {
    if (!beverages) {
      return [];
    }
    const options = beverages
      .sort()
      .map((bev: any) => {
        return { value: bev._id, label: bev.name };
      });

    return options;
  }, [beverages])

  const sizeOptions = useMemo<DropdownItem[]>(() => {
    if (!beverageSizes || !selectedBeverage) {
      return [];
    }

    const selectedBeverageSizes = beveragesMap[selectedBeverage.value].sizes;
    const options = beverageSizes
      .filter(bs => selectedBeverageSizes?.includes(bs._id))
      .sort((a, b) => { return a.price - b.price })
      .map((sz: any) => {
        return { value: sz._id, label: `${sz?.size} - $${sz.price}` }
      });

    return options;
  }, [beverageSizes, selectedBeverage])

  useEffect(() => {
    let totalPrice = 0;

    for (const item of orderItems) {
      if (!!item) {
        const size = sizesMap[item.sizeId];

        totalPrice += size.price * item.quantity;
      }
    }

    setTotal(totalPrice);
  }, [orderItems]);

  const formatOrdeItem = (item: OrderItem) => {
    const { beverageId, sizeId, quantity } = item;
    const beverage = beveragesMap[beverageId];
    const size = sizesMap[sizeId];
    const formatted = `${beverage.name} - ${size.size}($${size.price}) : ${quantity}`;

    return formatted;
  }

  const onAddItems = () => {
    const item: OrderItem = {
      beverageId: selectedBeverage?.value || '',
      sizeId: selectedSize?.value || '',
      quantity: selectedQuantity || 0
    };

    setOrderItems([...orderItems, item]);

    //reset
    setSelectedBeverage(null);
    setSelectedSize(null);
    setSelectedQuantity(null);
  }

  const onSubmit = async () => {
    const newOrder = {
      customerName: name,
      contact: contact,
      items: orderItems
    }

    const resp = await addOrder.mutateAsync(newOrder);
    Alert.alert(`Order Number: ${resp.data.id}`);
    router.back();
  }

  const onBeverageSelect = (item: DropdownItem) => {
    setSelectedBeverage(item);
  }

  return (
    <View style={styles.container}>
      <ThemedText style={styles.header} type="title">Your Order Total is
        <Text style={{ color: Colors.common.error }}>{` $${total}`}</Text>
      </ThemedText>
      <ScrollView style={{ height: '70%' }} contentContainerStyle={styles.scroll} >
        <Input text={name} label="Customer Name" onChange={(txt) => setName(txt)} />
        <Input text={contact} label="Contact Info" onChange={(txt) => setContact(txt)} />
        <View style={styles.dropdowns}>
          <Dropdown
            label='Quantity'
            data={quantityOptions()}
            placeholder='Select Quantity'
            onSelect={(item: DropdownItem) => setSelectedQuantity(parseInt(item.label))} />}
          {selectedQuantity &&
            <Dropdown
              label='Beverage'
              data={beverageOptions}
              placeholder='Select Beverage'
              onSelect={onBeverageSelect} />}
          {selectedQuantity && selectedBeverage &&
            <Dropdown
              label='Beverage Size'
              data={sizeOptions}
              placeholder='Select Beverage Size'
              onSelect={(item: DropdownItem) => setSelectedSize(item)} />}
          <Button title='Add' type="submit" size="small" onPress={onAddItems} />
        </View>
        <List data={orderItems.map(ord => formatOrdeItem(ord))} label='Selected Beverages' />
      </ScrollView>
      <View style={styles.buttons}>
        <Button title='Submit' type="success" onPress={onSubmit} />
        <Button title='Cancel' onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    borderBottomWidth: 2
  },
  scroll: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  dropdowns: {
    height: 350,
    borderWidth: 1,
    borderRadius: 10,
    borderBlockColor: Colors.common.default,
    paddingHorizontal: 10
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 50,
    marginBottom: 20
  },
});
