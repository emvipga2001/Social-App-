import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useRecoilValue } from 'recoil'
import { auth } from '../../firebase'
import firebase from '../../firebase/config'
import Covid from './Covid'
import { statusState } from './StatusState'

export default function Blog({ navigation }) {
    const [status, setStatus] = useState([])
    const [url, setUrl] = useState(null)
    const [likeQty, setLikeQty] = useState([])
    function footer() {
        return (
            <View style={{
                flex: 1, alignItems: 'center',
                justifyContent: 'flex-start', height: 120
            }}>
                <Text style={{ fontSize: 20 }}>Đã xem hết tin</Text>
            </View>
        )
    }
    const [user, setUser] = useState([]);
    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(user => {
            setUser(user)
            firebase.storage().ref('users/' + user.uid + "/avatar.png").getDownloadURL().then((url) => { setUrl(url) })
        });
        return subscriber; // unsubscribe on unmount
    }, []);
    useEffect(() => {
        function readUserData() {
            firebase.database().ref('status/').orderByChild('order').on('value', function (snapshot) {
                let array = [];
                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    const x = childData.like
                    array.push({
                        content: childData.content,
                        day: childData.day,
                        image: childData.image,
                        user: childData.user,
                        avatar: childData.avatar,
                        comment: childData.comment,
                        id: childSnapshot.key,
                        like: Object.keys(x).length,
                    });
                });
                setStatus(array)
            });
        }
        readUserData();
    }, [])
    // console.log(likeQty);
    async function like(id, like) {
        const url = await auth.currentUser?.uid
        firebase.database().ref('status/' + id + '/like/' + url).update({
            url
        })
    }
    // useEffect(() => {
    //     const getUserData = async () => {
    //         const url = await auth.currentUser?.uid
    //         firebase.storage().ref('users/' + url + "/avatar.png").getDownloadURL().then((url) => { setUrl(url) })
    //     }
    //     getUserData();
    // }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Feed</Text>
            </View>
            <View style={styles.body}>
                {user ? <View style={styles.inputStatus}>
                    {url && <Image source={{ uri: url }} style={styles.avatarInput}></Image>}
                    <TouchableOpacity style={styles.input}>
                        <Text onPress={() => navigation.navigate('Status')} >Bạn đang nghĩ gì ?</Text>
                    </TouchableOpacity>
                </View> : <View style={styles.inputStatus}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => navigation.navigate('Login')}>Login now</Text>
                    </View>
                    <View style={styles.button1}>
                        <Text style={styles.buttonText}>Sign up</Text>
                    </View>
                </View>}
                <View style={styles.liststatus}>
                    <View style={{ flex: 2 }}>
                        <FlatList data={status}
                            keyExtractor={(item, index) => index.toString()}
                            ListHeaderComponent={Covid}
                            ListFooterComponent={footer}
                            renderItem={({ item }) => (
                                <>
                                    {item.image ? <View style={styles.status}>
                                        <View style={styles.headerStatus}>
                                            <Image source={{ uri: item.avatar }} style={styles.avatarInput}></Image>
                                            <View style={{ left: 10 }}>
                                                <Text style={{ textAlign: 'center' }}>{item.user}</Text>
                                                <Text>{item.day}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.bodyStatus}>
                                            <Text style={styles.text}>{item.content}</Text>
                                            <Image source={{ uri: item.image ? item.image : null }} style={styles.imageStatus}></Image>
                                        </View>
                                        <View style={styles.footerStatus}>
                                            <Text></Text>
                                            <TouchableOpacity onPress={() => like(item.id, item.like)}>
                                                <Text>{item.like} Thích</Text>
                                            </TouchableOpacity>
                                            <Text>|</Text>
                                            <TouchableOpacity onPress={() => navigation.push('Comments', { postId: item.id })}>
                                                <Text>Bình Luận</Text>
                                            </TouchableOpacity>
                                            <Text></Text>
                                        </View>
                                    </View> : <View style={styles.statusI}>
                                        <View style={styles.headerStatus}>
                                            <Image source={{ uri: item.avatar }} style={styles.avatarInput}></Image>
                                            <View style={{ left: 10 }}>
                                                <Text style={{ textAlign: 'center' }}>{item.user}</Text>
                                                <Text>{item.day}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.bodyStatus}>
                                            <Text style={styles.text}>{item.content}</Text>
                                        </View>
                                        <View style={styles.footerStatus}>
                                            <Text></Text>
                                            <TouchableOpacity onPress={() => like(item.id, item.like)}>
                                                <Text>{item.like} Thích</Text>
                                            </TouchableOpacity>
                                            <Text>|</Text>
                                            <TouchableOpacity onPress={() => navigation.push('Comments', { postId: item.id })}>
                                                <Text>Bình Luận</Text>
                                            </TouchableOpacity>
                                            <Text></Text>
                                        </View>
                                    </View>}
                                </>

                            )}
                        />
                        {/* <View style={styles.statusfooter}>
                                        <Text style={styles.text}>Đã hết tin</Text>
                                    </View> */}
                    </View>
                </View>
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
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        borderBottomWidth: 1,
        backgroundColor: '#036635'
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
    body: {
        flex: 7,
        width: '100%',

    },
    inputStatus: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    avatarInput: {
        height: 50,
        width: 50,
        borderRadius: 400 / 2,
        top: 6
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        width: "70%",
    },
    liststatus: {
        flex: 10,
        padding: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    status: {
        marginTop: 10,
        height: 550,
        backgroundColor: 'white',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 1,
    },
    statusI: {
        marginTop: 10,
        height: 200,
        backgroundColor: 'white',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 1,
    },
    text: {
        textAlign: 'left',
        fontSize: 15,
        padding: 10
    }, statusfooter: {
        marginTop: 10,
        backgroundColor: 'pink',
        height: 150,
        justifyContent: 'space-between',
    }, headerStatus: {
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        backgroundColor: 'white'
    }, bodyStatus: {
        flex: 2,
        padding: 10,
        bottom: 10
    },
    footerStatus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderTopWidth: 0.2,
        backgroundColor: 'white'
    },
    imageStatus: {
        height: "100%",
        width: 'auto'
    }, covid: {
        padding: 10,
        marginBottom: 20
    }, button: {
        borderRadius: 20,
        backgroundColor: '#036635',
        borderRadius: 50,
        height: 40,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },button1: {
        borderRadius: 20,
        backgroundColor: '#036635',
        borderRadius: 50,
        height: 40,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginLeft:10
    }
})
