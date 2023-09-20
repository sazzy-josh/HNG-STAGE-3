// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "drag-and-drop-c4cbc.firebaseapp.com",
  projectId: "drag-and-drop-c4cbc",
  storageBucket: "drag-and-drop-c4cbc.appspot.com",
  messagingSenderId: "134438588907",
  appId: "1:134438588907:web:02d3b7a31a25b6e13789ae",
  measurementId: "G-JLFV1TCSL8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
