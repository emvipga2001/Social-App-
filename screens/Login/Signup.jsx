import {
    Box, Button, FormControl, Heading, HStack, Input,
    Link, NativeBaseProvider, Text, VStack
} from 'native-base';
import React from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase'
import firebase from 'firebase/app'
import * as ImagePicker from 'expo-image-picker';
export default function Detail({ navigation }) {
    const [show, setShow] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const handleClick = () => setShow(!show)
    const [image, setImage] = React.useState(null);
    const [imageProfile, setImageProfile] = React.useState(null);
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
    React.useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);
    async function upLoadImage(uid) {
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
        const response = firebase.storage().ref('users/' + uid ).child('avatar.png');
        const snapshot = await response.put(blob);
        const remoteUri = await snapshot.ref.getDownloadURL();
        blob.close();
        return remoteUri;
    }
    const Signup = async() => {
        auth.
            createUserWithEmailAndPassword(email, password)
            .then(async(userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const url = await upLoadImage(user.uid)
                setImageProfile(url)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert("Không đúng định dạng email hoặc mật khẩu không hợp lệ")
            });
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <NativeBaseProvider style={styles.container}>
                    <View style={{ flex: 1, alignItems: 'center' }} >
                    {image &&
                            <View style={{ flex: 1 }}>
                                <Image source={{ uri: image }} style={{
                                    height:180,
                                    width: 180,
                                    borderRadius: 400 / 2,
                                    top: 6,
                                    marginTop:50,
                                    marginBottom:20
                                }} />
                            </View>
                        }
                    </View>
                    <View style={{ flex: 3 }}>
                        <Box
                            safeArea
                            flex={1}
                            p={2}
                            w="90%"
                            mx='auto'
                        >
                            <Heading size="lg" color='#036635'>
                                Sign Up
                            </Heading>
                            <Heading color="muted.400" size="xs">
                                Please enter full information!
                            </Heading>
                            <VStack space={2} mt={5}>
                                <FormControl>
                                    <FormControl.Label _text={{ color: '#036635', fontSize: 'sm', fontWeight: 600 }}>
                                        Email ID
                                    </FormControl.Label>
                                    <Input onChangeText={text => setEmail(text)} />
                                </FormControl>
                                <FormControl mb={5}>
                                    <FormControl.Label _text={{ color: '#036635', fontSize: 'sm', fontWeight: 600 }}>
                                        Password
                                    </FormControl.Label>
                                    <Input type="password" onChangeText={text => setPassword(text)} />
                                </FormControl>
                                <FormControl mb={5}>
                                    <TouchableOpacity title="add image" onPress={chooseImage}>
                                        <Image source={require('../../assets/tabbaricon/home.png')} style={{ width: 40, height: 40, tintColor: 'black' }} resizeMode='contain' />
                                    </TouchableOpacity>
                                </FormControl>
                                <VStack space={2}>
                                    <Button style={{ backgroundColor: '#036635' }} _text={{ color: 'white' }} onPress={Signup}>
                                        Sign Up Now
                                    </Button>
                                    <HStack justifyContent="center">
                                        <Text fontSize='sm' color='#036635' fontWeight={400}>If you have accout back to  </Text>
                                        <Link _text={{ color: '#036635', bold: true, fontSize: 'sm' }} onPress={() => navigation.navigate('Login')}>
                                            Login
                                        </Link>
                                    </HStack>
                                </VStack>
                            </VStack>
                        </Box>
                    </View>
                </NativeBaseProvider>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
    }
})
