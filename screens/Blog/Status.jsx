import React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Image, ActivityIndicator } from 'react-native'
import firebase from 'firebase/app'
import moment from 'moment'
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler'
import storage from '@react-native-firebase/storage';
import { auth } from '../../firebase'
// import { LogBox } from 'react-native';

// LogBox.ignoreLogs(['100000000'])

export default function Status({ navigation }) {
    const [content, setContent] = useState("")
    const [image, setImage] = useState(null);
    const getDate = moment().format("DD-MM-YYYY")
    let [orderDate, setOrderDate] = useState(0)
    let order = new Date().getDate();
    const chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    }
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);
    async function upLoadImage() {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", image, true);
            xhr.send(null);
        });
        const response = firebase.storage().ref('StatusImage').child(new Date().toISOString());
        const snapshot = await response.put(blob);
        const remoteUri = await snapshot.ref.getDownloadURL();
        blob.close();
        return remoteUri;
    }
    const [url, setUrl] = useState(null)
    useEffect(() => {
        const getUserData = async () => {
            await firebase.storage().ref('users/' + auth.currentUser?.uid + "/avatar.png").getDownloadURL().then((url) => { setUrl(url) })
        }
        getUserData();
    }, [])
    const addDataBase = async (content) => {
        if (image === null) {
            const name = auth.currentUser?.email
            firebase.database().ref('status/').push().set({
                content: content,
                day: `${getDate}`,
                order: order,
                user: name,
                avatar:url,
                like:{
                    like:'a'
                }
            }, function (error) {
                if (error) {
                    // The write failed...
                    alert('Lỗi')
                } else {
                    // Data saved successfully!
                    alert('Thành Công !!!')
                }
            })
        } else {
            const urlI = await upLoadImage()
            const name = auth.currentUser?.email
            firebase.database().ref('status/').push().set({
                content: content,
                day: `${getDate}`,
                order: --orderDate,
                image: urlI,
                user: name,
                avatar:url,
                like:{
                    like:'a'
                }
            }, function (error) {
                if (error) {
                    // The write failed...
                    alert('Lỗi')
                } else {
                    // Data saved successfully!
                    alert('Thành Công !!!')
                }
            })
        }


    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 0.5 }}></View>
            <View style={styles.header}>
                <View style={styles.headerTitle}>
                    <Button title='Go Back' onPress={() => navigation.goBack()}></Button>
                    <Text style={styles.textHeader}>Tạo bài viết</Text>
                    <Button title='Đăng' onPress={() => {
                        addDataBase(content)
                    }} ></Button>
                </View>
            </View>
            <View style={styles.body}>
                <TextInput style={{ fontSize: 25, height: 200, textAlignVertical: 'top' }} multiline={true}
                    numberOfLines={4} placeholder='Bạn đang nghĩ gì ?' value={content} onChangeText={(e) => setContent(e)} />
                {image &&
                    <View style={{ flex: 1 }}>
                        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                        <Button title='Xoa'>
                        </Button>
                    </View>
                }
            </View>
            <View style={styles.footer}>
                <TouchableOpacity title="add image" onPress={chooseImage}>
                    <Image source={require('../../assets/tabbaricon/home.png')} style={{ width: 40, height: 40, tintColor: 'black' }} resizeMode='contain' />
                </TouchableOpacity>
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
        width: '100%',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    headerTitle: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    textHeader: {
        fontSize: 20
    },
    body: {
        flex: 7,
        width: '100%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 0.5,
        backgroundColor: 'pink',
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',

    }
})
