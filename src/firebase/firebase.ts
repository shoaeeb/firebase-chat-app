// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

console.log(import.meta.env.VITE_API_KEY);
const firebaseConfig = {
  apiKey: "AIzaSyAaXqhzzXPexnJ9otLmCYaoUhNtj-ftdHQ",
  authDomain: "fir-chat-app-14701.firebaseapp.com",
  projectId: "fir-chat-app-14701",
  storageBucket: "fir-chat-app-14701.appspot.com",
  messagingSenderId: "1027937434899",
  appId: "1:1027937434899:web:5eba248c851cd10b63eee6",
  measurementId: "G-R5H85B6CL6",
  databaseURL:
    "https://fir-chat-app-14701-default-rtdb.asia-southeast1.firebasedatabase.app", // Update this URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);
export { app, firestore, auth, database };
