import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyCjmBWHtyq1nbmYEt4-Kkxv1pAnCxRPXfk",
    authDomain: "huongque-421a4.firebaseapp.com",
    databaseURL: "https://huongque-421a4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "huongque-421a4",
    storageBucket: "huongque-421a4.appspot.com",
    messagingSenderId: "542548910439",
    appId: "1:542548910439:web:bf4b7324c08b3618f0cfc2"
};

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

export const auth=firebase.auth()
