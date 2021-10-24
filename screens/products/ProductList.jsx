import React from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { addToCart, cartState } from '../Cart/CartRecoil';
import { productListState } from './ProductState';

export default function ProductList({navigation}) {
    const [productList, setProductList] = useRecoilState(productListState);
    const [cart, setCart] = useRecoilState(cartState); // 1. Get recoil state
    const handleAddToCart = (product) => {
        Alert.alert("Add product to cart successfully")
        const newCart = addToCart(cart, product); // 2. Use helper to create a new state
        setCart(newCart); // 3. Update recoil state
    }
    return (
        <View style={{ flex: 1,alignItems:'center',marginTop:50}}>
            <View style={{ flex: 2}}>
                <FlatList data={productList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={{ textAlign: 'center' }}>{item.name}{'\n'}{item.price}.000 vnđ</Text>
                            <Button onPress={() =>handleAddToCart(item)} title='Add to cart'/>
                            <Button onPress={()=>navigation.navigate('Chat')} title='Chat hear'></Button>
                        </View>
                    )} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
