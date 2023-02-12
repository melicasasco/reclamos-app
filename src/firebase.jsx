// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr496qfk5JtL5eI_SbDJhGfszM0tFLWnw",
  authDomain: "wingu-e6643.firebaseapp.com",
  projectId: "wingu-e6643",
  storageBucket: "wingu-e6643.appspot.com",
  messagingSenderId: "270229179795",
  appId: "1:270229179795:web:d342dd72947a9ff381ac66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);


