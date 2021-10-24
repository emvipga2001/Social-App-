import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, KeyboardAvoidingView } from 'react-native'
import firebase from 'firebase/app'
import "firebase/firestore";
import { auth } from '../../firebase'
import { useEffect } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default function Comments(props) {
    const [comments, setCommnets] = useState([])
    const [status, setStatus] = useState([])
    const [content, setContent] = useState("")
    const id = props.route.params.postId;
    // const user =  props.route.params.user;
    // const day =  props.route.params.day;
    // const content =  props.route.params.content;
    // const image =  props.route.params.image;
    async function getAvatar() {
        const uid = await auth.currentUser?.uid
        const response = firebase.storage().ref('users/' + uid).child('avatar.png').getDownloadURL();
        console.log(response);
        return response
    }
    useEffect(() => {
        function readCommnets() {
            firebase.database().ref('status/' + id + '/comments').on('value', (snapshot) => {
                let data = [];
                let comment = []
                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    data.push(childData);
                });
                data.forEach(async (item) => {
                    comment.push({
                        content: item.content,
                        url: item.url,
                        name: item.name,
                        avatar: item.avatar,
                    })
                })
                setCommnets(comment);
            });
        }
        readCommnets();
    }, [id])
    useEffect(() => {
        function readUserData() {
            firebase.database().ref('status/' + id).on('value', (snapshot) => {
                const data = snapshot.val();
                setStatus(data)
            });
        }
        readUserData();
    }, [])
    const addComments = async (content) => {
        const url = await auth.currentUser?.uid
        const name = await auth.currentUser?.email
        const avatar = await getAvatar()
        firebase.database().ref('status/' + id + "/comments/").push().set({
            url: url,
            content: content,
            name: `${name}`,
            avatar: avatar,
        }, function (error) {
            if (error) {
                // The write failed...
                alert('Lỗi')
            } else {
                // Data saved successfully!
                alert('Thành Công !!!')
                setContent('')
            }
        })
    }
    function header() {
        return (
            <>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Text style={{fontSize:20,color:'white'}}>Back</Text>
                    </TouchableOpacity>
                </View>
                {status.image ?
                    <View style={{ borderBottomWidth: 0.2 }}>
                        <View style={styles.status}>
                            <View style={styles.headerStatus}>
                                <Image source={{ uri: status.avatar }} style={styles.avatarInput}></Image>
                                <View style={{ left: 10 }}>
                                    <Text style={{ textAlign: 'center' }}>{status.user}</Text>
                                    <Text>{status.day}</Text>
                                </View>
                            </View>
                            <View style={styles.bodyStatus}>
                                <Text style={styles.text}>{status.content}</Text>
                                <Image source={{ uri: status.image ? status.image : null }} style={styles.imageStatus}></Image>
                            </View>
                            <View style={styles.footerStatus}>
                                <Text style={{ textAlign: 'right' }}>Comments</Text>
                            </View>
                        </View>
                    </View> :
                    <View style={styles.liststatus}>
                        <View style={styles.statusI}>
                            <View style={styles.headerStatus}>
                                <Image source={{ uri: status.avatar }} style={styles.avatarInput}></Image>
                                <View style={{ left: 10 }}>
                                    <Text style={{ textAlign: 'center' }}>{status.user}</Text>
                                    <Text>{status.day}</Text>
                                </View>
                            </View>
                            <View style={styles.bodyStatus}>
                                <Text style={styles.text}>{status.content}</Text>
                            </View>
                            <View style={styles.footerStatus}>
                                <Text style={{ textAlign: 'right' }}>Comments</Text>
                            </View>
                        </View>
                    </View>
                }

            </>
        )
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
                <FlatList
                    data={comments}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={header}
                    removeClippedSubviews={false}
                    ListFooterComponent={
                        <View style={styles.footer}>
                            <View style={{ backgroundColor: 'white', width: 300, borderWidth: 1, borderRadius: 30, bottom: 10 }}>
                            <TextInput style={{marginLeft:10,marginTop:10}}
                                placeholder="Viết bình luận" onChangeText={(e) => setContent(e)} value={content} ></TextInput>
                            </View>
                            <TouchableOpacity onPress={() => addComments(content)} style={{marginBottom:25,marginLeft:10}}>
                                <Image source={require('../../assets/send.png')} style={{ width: 25, height: 25, tintColor: '#036635' }}></Image>
                            </TouchableOpacity>
                            {/* <Button style={{ bottom: 100 }} title="Gửi" onPress={() => addComments(content)}></Button> */}
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.footerStatus}>
                            {comments ? <View>
                                <View style={styles.headerComments}>
                                    <Image source={{ uri: item.avatar }} style={styles.avatarInput}></Image>
                                    <View style={styles.content}>
                                        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                        <Text numberOfLines={3}>{item.content}</Text>
                                    </View>
                                </View>
                            </View> : null}
                        </View>
                    )}
                />
            </KeyboardAwareScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: 100,
        borderBottomWidth: 1,
        padding: 10,
        marginTop: 10,
        backgroundColor: '#036635',
        bottom: 10
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    body: {
        flex: 3,
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
    liststatus: {
        flex: 1
    },
    status: {
        marginTop: 10,
        height: 500,
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
    }, headerStatus: {
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        backgroundColor: 'white',
    }, bodyStatus: {
        flex: 2,
        padding: 10,
        bottom: 10
    },
    footerStatus: {
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 0.1
    },
    imageStatus: {
        height: "100%",
        width: 'auto'
    },
    footer: {
        flex: 2,
        top: 10,
        flexDirection: 'row',
        padding: 10
    },
    headerComments: {
        flexDirection: 'row',
        bottom: 10,
        padding: 5,
    },
    content: {
        top: 10,
        left: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        padding: 10,
        width: 250
    }
})
