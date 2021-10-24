// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjmBWHtyq1nbmYEt4-Kkxv1pAnCxRPXfk",
    authDomain: "huongque-421a4.firebaseapp.com",
    databaseURL: "https://huongque-421a4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "huongque-421a4",
    storageBucket: "huongque-421a4.appspot.com",
    messagingSenderId: "542548910439",
    appId: "1:542548910439:web:bf4b7324c08b3618f0cfc2"
};

// Initialize Firebase
if (!firebase.app.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('ket noi thanh cong');
}


export default firebase;