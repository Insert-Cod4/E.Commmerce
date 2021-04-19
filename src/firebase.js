//import * as firebase from 'firebase'
import firebase from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
const Config = {

    apiKey: "AIzaSyC4F-ODJ_XUH-We4LDs4Je01-7XWk_SQg8",
    authDomain: "ecommerce-ca4fa.firebaseapp.com",
    projectId: "ecommerce-ca4fa",
    storageBucket: "ecommerce-ca4fa.appspot.com",
    messagingSenderId: "414949086309",
    appId: "1:414949086309:web:e9c615ba018484bf58e28c"
  
};
  // Initialize Firebase
  // initialize firebase app
      if (!firebase.apps.length) {
         firebase.initializeApp(Config);
      }


  // export defaul
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();