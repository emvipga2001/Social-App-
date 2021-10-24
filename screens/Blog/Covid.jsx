import React, { useState } from 'react'
import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native'

export default function Covid() {
    const [covid, setCovid] = useState([])
    const url = 'https://api.covid19api.com/dayone/country/vietnam';
    async function getCovid(url) {
        const response = await fetch(url);
        const data = await response.json();
        const getLastCovid = data[data.length - 1]
        setCovid(getLastCovid)
    }
    useEffect(() => {
        getCovid(url)
    }, [])
    return (
        <View style={styles.container}>
            <View style={{flex:1}}>
            <Text style={{fontSize:18,padding:10}}>Thống kê tình hình dịch bệnh ở nước ta:</Text>
            </View>
            {covid &&
                <View style={styles.textCovid}>
                    <View style={styles.cardCovid}>
                        <Text style={{ textAlign: 'center' }}>Số ca nhiễm cả nước</Text>
                        <Text style={{ color: 'green', fontSize: 30, textAlign: 'center' }}>{covid.Active}</Text>
                    </View>
                    <View style={styles.cardCovid}>
                        <Text style={{ textAlign: 'center' }}>Số ca tử vong cả nước</Text>
                        <Text style={{ color: 'red', fontSize: 30, textAlign: 'center' }}>{covid.Deaths}</Text>
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }, textCovid: {
        flex: 2,
        flexDirection: 'row',
    },
    cardCovid: {
        flex: 1,
    }
})
