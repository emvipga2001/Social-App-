import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Hello</Text>
            </View>
            <View style={styles.body}>
                <Text>Hello</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }, body: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'red',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    }
})

