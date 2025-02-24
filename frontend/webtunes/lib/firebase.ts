import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCInDXnr6mMbwIMypE9Z7Yz3wLgyxZ33us",
    authDomain: "webtunes-1ec97.firebaseapp.com",
    projectId: "webtunes-1ec97",
    storageBucket: "webtunes-1ec97.firebasestorage.app",
    messagingSenderId: "648031158779",
    appId: "1:648031158779:web:3fd6658eb3b85b75e48b5e",
    measurementId: "G-D7NKHLKEVY"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);