// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//This is our firebase config to allow us to communicate with the firebase apis
const firebaseConfig = {
  apiKey: "AIzaSyA4oxQkCAve9NzLbTLkRIhMhw2PXdD28lo",
  authDomain: "dissertation-62bc8.firebaseapp.com",
  projectId: "dissertation-62bc8",
  storageBucket: "dissertation-62bc8.appspot.com",
  messagingSenderId: "642148909518",
  appId: "1:642148909518:web:4a8f14051c1b28e4a72b9f",
  measurementId: "G-NJV3W26BSG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//These allow us to connect to the authentication, firestore and storage apis and are exported so we can use throughout the app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);