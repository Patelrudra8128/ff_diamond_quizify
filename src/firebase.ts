import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDsrVXaFYEoUQMrJxwEpL7X201HTUMLNvI",
    authDomain: "ff-diamond-quizify.firebaseapp.com",
    projectId: "ff-diamond-quizify",
    storageBucket: "ff-diamond-quizify.firebasestorage.app",
    messagingSenderId: "622865790453",
    appId: "1:622865790453:web:8d3275044d2c0577a05cbc",
    measurementId: "G-ZR73MQPXRZ"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
getAnalytics(app);
export const db: Firestore = getFirestore(app);