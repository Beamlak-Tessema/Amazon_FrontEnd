// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9fcM4R7vbtMI08KX3lICQOq3iUpp_IU4",
  authDomain: "clone-47e8d.firebaseapp.com",
  projectId: "clone-47e8d",
  storageBucket: "clone-47e8d.appspot.com", 
  messagingSenderId: "235477785673",
  appId: "1:235477785673:web:f0a56a67933dcd87753398",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
