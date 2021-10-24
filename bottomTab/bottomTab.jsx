import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import Account from '../screens/Account/Account';
import Blog from '../screens/Blog/Blog';
import CartList from '../screens/Cart/CartList';
import { cartLength } from '../screens/Cart/CartRecoil';
import Chat from '../screens/Chat/Chat';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import ProductList from '../screens/products/ProductList';
const Tab = createBottomTabNavigator();
const COLOR_STARBUCK = '#036635'
export default function BottomTab() {
    const lengthCart = useRecoilValue(cartLength)
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'black',
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                marginBottom: 20,
                left: 20,
                right: 20,
                height: 70,
                borderRadius: 20,
                borderTopWidth: 0,
                backgroundColor: COLOR_STARBUCK
            }
        }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: (tabinfo) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 1 }}>
                        <Image source={require('../assets/tabbaricon/home.png')} style={{ width: 40, height: 40, tintColor: 'white' }} resizeMode='contain' />
                        <Text style={{ fontSize: 12, color: 'white' }}>
                            Home
                        </Text>
                    </View>
                )
            }} />
            <Tab.Screen name="Blog" component={Blog} options={{
                tabBarIcon: (tabinfo) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 1 }}>
                        <Image source={require('../assets/tabbaricon/blog.png')} style={{ width: 40, height: 40, tintColor: 'white' }} resizeMode='contain' />
                        <Text style={{ fontSize: 12, color: 'white' }}>
                            Feed
                        </Text>
                    </View>
                )
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: (tabinfo) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 1 }}>
                        <Image source={require('../assets/tabbaricon/user.png')} style={{ width: 40, height: 40, tintColor: 'white' }} resizeMode='contain' />
                        <Text style={{ fontSize: 12, color: 'white' }}>
                            Profile
                        </Text>
                    </View>
                )
            }} />
            <Tab.Screen name="Account" component={Account} options={{
                tabBarIcon: (tabinfo) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 1 }}>
                        <Image source={require('../assets/tabbaricon/gear.png')} style={{ width: 40, height: 40, tintColor: 'white' }} resizeMode='contain' />
                        <Text style={{ fontSize: 12, color: 'white' }}>
                            Setting
                        </Text>
                    </View>
                )
            }} />
            
            {/* <Tab.Screen name="Product" component={ProductList} options={{
                tabBarIcon: (tabinfo) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 1 }}>
                        <Image source={require('../assets/tabbaricon/food.png')} style={{ width: 40, height: 40, tintColor: 'white' }} resizeMode='contain' />
                        <Text style={{ fontSize: 12, color: 'white' }}>
                            Product
                        </Text>
                    </View>
                )
            }} />
            <Tab.Screen name="Cart" component={CartList} options={{
                tabBarIcon: (tabinfo) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 1 }}>
                        {lengthCart > 0 ? <View style={styles.cartLength}><Text style={styles.textCartLength}>{lengthCart}</Text></View> : null}
                        <Image source={require('../assets/tabbaricon/cart.png')} style={{ width: 40, height: 40, tintColor: 'white' }} resizeMode='contain' />
                        <Text style={{ fontSize: 12, color: 'white' }}>
                            Cart
                        </Text>
                    </View>
                )
            }}
            /> */}
            
            
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    cartLength: {
        position: 'absolute',
        top: -10,
        height: 20,
        right: -10,
        paddingTop: 5,
        paddingLeft: 10,
        backgroundColor: 'red',
        borderRadius: 100,
    },
    textCartLength: {
        textAlign: 'center',
        color: 'white',
        right: 4,
        bottom: 4
    }
})