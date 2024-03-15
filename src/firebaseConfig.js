// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBBp0SRIPCQaL95T3ShtMFw9G-_q-Ug6e0",
  authDomain: "tailwind-with-todo.firebaseapp.com",
  projectId: "tailwind-with-todo",
  storageBucket: "tailwind-with-todo.appspot.com",
  messagingSenderId: "682901759758",
  appId: "1:682901759758:web:a5b5134920b5b4758cd95f",
  measurementId: "G-7GNCSNLQ3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig