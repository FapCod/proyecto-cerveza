import firebase from 'firebase'
import 'firebase/auth'
//otro
import 'firebase/firestore'
//otro

const firebaseConfig = {
    apiKey: "AIzaSyClXSFSxaM3KKtj6RWTpy1A6UWJM-29XgQ",
    authDomain: "cerveceriareact.firebaseapp.com",
    projectId: "cerveceriareact",
    storageBucket: "cerveceriareact.appspot.com",
    messagingSenderId: "941411665297",
    appId: "1:941411665297:web:c3691410eadf682c978630",
    measurementId: "G-RZLTMWT2SL"
  };
const fire = firebase.initializeApp(firebaseConfig);
//otro
const DBstore = fire.firestore()
//otro
const auth = fire.auth()
export {auth,DBstore}