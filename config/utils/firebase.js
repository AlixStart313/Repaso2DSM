// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQNgfspKIumkSIT25b5q-Yd69sacJ0xWU",
    authDomain: "airbnbproyect.firebaseapp.com",
    projectId: "airbnbproyect",
    storageBucket: "airbnbproyect.appspot.com",
    messagingSenderId: "906706477044",
    appId: "1:906706477044:web:f0ad2cc1d9d81030b123a1"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =  initializeAuth(app, {persistance : getReactNativePersistence(AsyncStorage)} )