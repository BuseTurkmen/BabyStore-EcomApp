// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
import { getAuth } from "firebase/auth"; // Add this line to import the auth module


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCCEJ7uSfvz11wigzuouDiyzwWM4k4v4s",
    authDomain: "ecompro-15d48.firebaseapp.com",
    projectId: "ecompro-15d48",
    storageBucket: "ecompro-15d48.appspot.com",
    messagingSenderId: "955936678644",
    appId: "1:955936678644:web:a38b35d9551889165034a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const  db = getFirestore(app)
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize the Firebase Authentication module


export {app,db, auth} 