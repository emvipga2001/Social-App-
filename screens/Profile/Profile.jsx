import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../../firebase'
import firebase from '../../firebase/config'
export default function Profile({ navigation }) {
    const [url, setUrl] = useState(null)
    const [name, setName] = useState('')
    const [user, setUser] = useState([]);
    const [status, setStatus] = useState([])
    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(user => {
            setUser(user)
            setName(user.email)
            firebase.storage().ref('users/' + user.uid + "/avatar.png").getDownloadURL().then((url) => { setUrl(url) })
            firebase.database().ref('status/').orderByChild("user").equalTo(user.email).on('value', function (snapshot) {
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
        });
        return subscriber; // unsubscribe on unmount
    }, [user]);
    // useEffect(() => {
    //     async function readUserData() {
    //         firebase.database().ref('status/').orderByChild("user").equalTo(name).on('value', function (snapshot) {
    //             let array = [];
    //             snapshot.forEach(function (childSnapshot) {
    //                 var childData = childSnapshot.val();
    //                 const x = childData.like
    //                 array.push({
    //                     content: childData.content,
    //                     day: childData.day,
    //                     image: childData.image,
    //                     user: childData.user,
    //                     avatar: childData.avatar,
    //                     comment: childData.comment,
    //                     id: childSnapshot.key,
    //                     like: Object.keys(x).length,
    //                 });
    //             });
    //             setStatus(array)
    //         });
    //     }
    //     readUserData();
    // }, [])
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
    if (user !== null) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    {url && <Image source={{ uri: url }} style={styles.avatar}></Image>}
                </View>
                <View style={styles.body}>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.liststatus}>
                        <View style={{ flex: 2 }}>
                            <FlatList data={status}
                                keyExtractor={(item, index) => index.toString()}
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
                                                <TouchableOpacity>
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
                                                <TouchableOpacity>
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
                        </View>
                    </View>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../../assets/logo.png')} style={{ height: 300, width: 300 }}></Image>
                </View>
                <View style={styles.body}>
                    <Text style={styles.name}>Chào mừng bạn đến với Hương Quê{'\n'}</Text>
                    <Text style={styles.textHeader}>Vui lòng đăng nhập</Text>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10
                    }}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText} onPress={() => navigation.navigate('Login')}>Login now</Text>
                        </View>
                    </View>
                    <Text style={styles.textHeader}>{'\n'}Nếu là lần đầu thì tạo cho mình 1 tài khoản</Text>
                    <View style={styles.liststatus}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <View style={styles.buttonBody}>

                                <View style={styles.button1}>
                                    <Text style={styles.buttonText}>Sign up</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
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
        backgroundColor: '#036635',
    }, body: {
        flex: 3,
        width: '100%',
    },
    name: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 60,
        fontWeight: 'bold',
    },
    textHeader: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 60,
    },
    avatar: {
        height: 150,
        width: 150,
        borderRadius: 400 / 2,
        marginTop: 150,
        position: 'relative',
        borderColor: 'white',
        borderWidth: 3,
    },
    avatarInput: {
        height: 50,
        width: 50,
        borderRadius: 400 / 2,
        top: 6
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
    }, buttonBody: {
        flexDirection: 'row',
        marginBottom: 20
    },
    button: {
        borderRadius: 20,
        backgroundColor: '#036635',
        borderRadius: 50,
        height: 40,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button1: {
        borderRadius: 20,
        backgroundColor: '#036635',
        borderRadius: 50,
        height: 40,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5
    }, buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
})

