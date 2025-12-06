// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);