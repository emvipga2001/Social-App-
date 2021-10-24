import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

export default function Chat() {
    const [text, setText] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.header}>

            </View>
            <View style={styles.body}>
                <Text style={styles.chat} >Chat</Text>
            </View>
            <View style={styles.footer}>
                <TextInput value={text} style={styles.input} />
                <Button title='Send'  />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flex: 1,
    },
    body: {
        flex: 10,
        backgroundColor: 'black',
        justifyContent:'flex-end',
        
    },
    chat:{
        textAlign:'right',
        color:'white',
    },
    footer: {
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:20,
        width:"70%"
    },
})
