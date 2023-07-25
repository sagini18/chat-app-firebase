// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDtIscJMq46r7LeoY3jGGq5CYcWHxDpNe8",
  authDomain: "chat-c9b11.firebaseapp.com",
  projectId: "chat-c9b11",
  storageBucket: "chat-c9b11.appspot.com",
  messagingSenderId: "557403164730",
  appId: "1:557403164730:web:5cc215def0818c5f64a503",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
