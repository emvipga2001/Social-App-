import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import BottomTab from './bottomTab/bottomTab';
import Status from './screens/Blog/Status';
import Chat from './screens/Chat/Chat';
import Login from './screens/Login/Login';
import Signup from './screens/Login/Signup';
import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import { firebaseConfig } from './firebase';
import Comments from './screens/Blog/Comments';
import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = message => {
if (message.indexOf('Setting a timer') <= -1) {
   _console.warn(message);
   }
};

const Stack = createStackNavigator();
export default function App() {
  useEffect(() => {
    firebaseConfig

  }, [])
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BottomTab" screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Status" component={Status} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Comments" component={Comments} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}


