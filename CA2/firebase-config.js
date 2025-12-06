// Firebase configuration for Memory Game
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXdAXVxgkZMpY5FOchZXTRSnIv81WSDrk",
  authDomain: "ca2-rwat.firebaseapp.com",
  projectId: "ca2-rwat",
  storageBucket: "ca2-rwat.firebasestorage.app",
  messagingSenderId: "321016538190",
  appId: "1:321016538190:web:247c5f030a79578fec8f1f",
  measurementId: "G-PFELKQGTP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firestore database
export const db = getFirestore(app);