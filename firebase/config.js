// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEB8fCIdldM3tHJViOk3eiGp9Ev3gfoYs",
  authDomain: "todonativeauth.firebaseapp.com",
  projectId: "todonativeauth",
  storageBucket: "todonativeauth.appspot.com",
  messagingSenderId: "642778235407",
  appId: "1:642778235407:web:0f2e32676af4850cb7d97a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export { app,   }