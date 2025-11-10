// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsrVXaFYEoUQMrJxwEpL7X201HTUMLNvI",
    authDomain: "ff-diamond-quizify.firebaseapp.com",
    projectId: "ff-diamond-quizify",
    storageBucket: "ff-diamond-quizify.firebasestorage.app",
    messagingSenderId: "622865790453",
    appId: "1:622865790453:web:8d3275044d2c0577a05cbc",
    measurementId: "G-ZR73MQPXRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);