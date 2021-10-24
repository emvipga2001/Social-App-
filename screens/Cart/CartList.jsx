
import React from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'
import { addToCart, cartState, cartTotal, deleteCart, minusQty } from './CartRecoil'
export default function CartList() {
    const [cart, setCart] = useRecoilState(cartState)
    const total =useRecoilValue(cartTotal)
    
    const plusItem=(product)=>{
        const plus=addToCart(cart, product)
        setCart(plus)        
    }
    const minusItem=(product)=>{
        const plus=minusQty(cart, product)
        setCart(plus)        
    }
    const deleteItem = (product) => {
        const newCart = deleteCart(cart,product); // 2. Use helper to create a new state
        setCart(newCart); // 3. Update recoil state
    }
    const length = cart.length;
    return (
        <View style={{  flex: 1,alignItems:'center',marginTop:50 }}>
            <View style={{ flex: 2 }}>
                <FlatList data={cart}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item})  => (
                        <View>
                            <Text style={{ textAlign: 'center' }}>Name:{item.product.name}{'\n'}Price:{item.product.price}.000đ Quantity:{item.quantity}</Text>
                            <Button onPress={()=>plusItem(item)} title="+" />
                            <Button onPress={()=>minusItem(item)} title="-" />
                            <Button onPress={()=>deleteItem(item)} title="x" />
                        </View>
                    )} />
            </View>
            <Text>{length>0 ? `Total: ${total}.000 VND`:`Total: 0 VND`}</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({})
