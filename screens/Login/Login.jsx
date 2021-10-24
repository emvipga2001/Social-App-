import * as React from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {
    NativeBaseProvider,
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    Icon,
    IconButton,
    HStack,
    Divider
} from 'native-base';
import { auth } from '../../firebase'
import { StyleSheet, View, Image } from 'react-native';
export default function Category({ navigation }) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('BottomTab')
            }
        })
        return unsubscribe
    }, [])
    const Login = () => {
        auth.
            signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <NativeBaseProvider style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center' }} >
                <Image source={require('../../assets/logo.png')} style={{ height: 200, width: 200, marginTop: 50 }} />
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
                        Welcome
                    </Heading>
                    <Heading color="muted.400" size="xs">
                        Sign in to continue!
                    </Heading>

                    <VStack space={2} mt={5}>
                        <FormControl>
                            <FormControl.Label _text={{ color: '#036635', fontSize: 'sm', fontWeight: 600 }}>
                                Email ID
                            </FormControl.Label>
                            <Input onChangeText={text => setEmail(text)} type='email' />
                        </FormControl>
                        <FormControl mb={5}>
                            <FormControl.Label _text={{ color: '#036635', fontSize: 'sm', fontWeight: 600 }}>
                                Password
                            </FormControl.Label>
                            <Input type="password" onChangeText={text => setPassword(text)} />
                            <Link
                                _text={{ fontSize: 'xs', fontWeight: '700', color: '#036635' }}
                                alignSelf="flex-end"
                                mt={1}
                            >
                                Forget Password?
                            </Link>
                        </FormControl>
                        <VStack space={2}>
                            <Button style={{ backgroundColor: '#036635' }} _text={{ color: 'white' }} onPress={Login}>
                                Login
                            </Button>
                        </VStack>
                        <HStack justifyContent="center">
                            <Text fontSize='sm' color='#036635' fontWeight={400}>I'm a new user. </Text>
                            <Link _text={{ color: '#036635', bold: true, fontSize: 'sm' }} onPress={() => navigation.navigate('Signup')}>
                                Sign Up
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </View>
        </NativeBaseProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})